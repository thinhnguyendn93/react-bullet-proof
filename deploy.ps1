$Path = 'C:\Publish\source-base\'
$Folder = 'source-base'
$Des = "$Path$Folder"
if (Test-Path -Path $Des) {
    Remove-Item -Recurse -Force -LiteralPath $Des -erroraction 'silentlycontinue'
    echo 'Removed folder'
}
New-Item -Path $Path -Name $Folder -ItemType Directory  
Move-Item -Path .\public\* -Destination $Des -Force