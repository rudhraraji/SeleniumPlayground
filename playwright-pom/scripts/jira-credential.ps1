param(
  [Parameter(Mandatory = $true, Position = 0)]
  [ValidateSet('get', 'save')]
  [string] $Action
)

$ErrorActionPreference = 'Stop'
$target = 'SeleniumPlaygorund:Jira'
$legacyEmail = if ($env:JIRA_EMAIL) { $env:JIRA_EMAIL } else { 'rajirudhrakumar@gmail.com' }
$legacyTarget = "SeleniumPlaygorund:Jira:$legacyEmail"

$source = @'
using System;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Text;

public static class JiraCredentialStore
{
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    private struct Credential
    {
        public uint Flags;
        public uint Type;
        public IntPtr TargetName;
        public IntPtr Comment;
        public FileTime LastWritten;
        public uint CredentialBlobSize;
        public IntPtr CredentialBlob;
        public uint Persist;
        public uint AttributeCount;
        public IntPtr Attributes;
        public IntPtr TargetAlias;
        public IntPtr UserName;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct FileTime
    {
        public uint Low;
        public uint High;
    }

    [DllImport("Advapi32.dll", EntryPoint = "CredReadW", CharSet = CharSet.Unicode, SetLastError = true)]
    private static extern bool CredRead(string target, uint type, uint flags, out IntPtr credential);

    [DllImport("Advapi32.dll", EntryPoint = "CredWriteW", CharSet = CharSet.Unicode, SetLastError = true)]
    private static extern bool CredWrite(ref Credential credential, uint flags);

    [DllImport("Advapi32.dll", SetLastError = false)]
    private static extern void CredFree(IntPtr buffer);

    public static string ReadToken(string target, out string userName)
    {
        IntPtr buffer;
        if (!CredRead(target, 1, 0, out buffer))
        {
            throw new Win32Exception(Marshal.GetLastWin32Error());
        }

        try
        {
            Credential credential = (Credential)Marshal.PtrToStructure(buffer, typeof(Credential));
            userName = Marshal.PtrToStringUni(credential.UserName);
            byte[] token = new byte[credential.CredentialBlobSize];
            Marshal.Copy(credential.CredentialBlob, token, 0, token.Length);
            return Encoding.UTF8.GetString(token);
        }
        finally
        {
            CredFree(buffer);
        }
    }

    public static void SaveToken(string target, string userName, string token)
    {
        byte[] tokenBytes = Encoding.UTF8.GetBytes(token);
        if (tokenBytes.Length > 5120)
        {
            throw new ArgumentException("The Jira API token is too long for Windows Credential Manager.");
        }

        IntPtr targetPointer = Marshal.StringToHGlobalUni(target);
        IntPtr userPointer = Marshal.StringToHGlobalUni(userName);
        IntPtr tokenPointer = Marshal.AllocHGlobal(tokenBytes.Length);
        try
        {
            Marshal.Copy(tokenBytes, 0, tokenPointer, tokenBytes.Length);
            Credential credential = new Credential();
            credential.Type = 1;
            credential.TargetName = targetPointer;
            credential.CredentialBlobSize = (uint)tokenBytes.Length;
            credential.CredentialBlob = tokenPointer;
            credential.Persist = 2;
            credential.UserName = userPointer;
            if (!CredWrite(ref credential, 0))
            {
                throw new Win32Exception(Marshal.GetLastWin32Error());
            }
        }
        finally
        {
            Array.Clear(tokenBytes, 0, tokenBytes.Length);
            Marshal.FreeHGlobal(targetPointer);
            Marshal.FreeHGlobal(userPointer);
            Marshal.FreeHGlobal(tokenPointer);
        }
    }
}
'@

Add-Type -TypeDefinition $source

if ($Action -eq 'save') {
  $userName = if ($env:JIRA_EMAIL) { $env:JIRA_EMAIL } else { '' }
  $credential = Get-Credential -UserName $userName -Message 'Enter your Atlassian API token'
  if ($null -eq $credential) {
    throw 'Credential prompt was cancelled.'
  }

  $token = [System.Net.NetworkCredential]::new('', $credential.Password).Password
  [JiraCredentialStore]::SaveToken($target, $credential.UserName, $token)
  Write-Output 'Jira credentials saved in Windows Credential Manager.'
  exit 0
}

$userName = $null
$token = $null
$readTargets = @($target, $legacyTarget)

foreach ($candidateTarget in $readTargets) {
  try {
    $token = [JiraCredentialStore]::ReadToken($candidateTarget, [ref] $userName)
    if ($token) {
      break
    }
  } catch {
    $token = $null
    $userName = $null
  }
}

if ($null -eq $token) {
  throw 'Jira credentials were not found in Windows Credential Manager. Run "npm run jira:credential:save" once to save them.'
}

$storedCredentials = @{ email = $userName; apiToken = $token } | ConvertTo-Json -Compress
[Console]::Out.Write([Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($storedCredentials)))
