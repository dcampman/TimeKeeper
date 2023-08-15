<#
.SYNOPSIS
This script will build and deploy a Stream Deck plugin. It will also enable the HTML remote debugging option in the Stream Deck registry.
.PARAMETER debug
When specified, it will enable the HTML remote debugging. Otherwise, it will be set to non-debugging state.
#>

param(
    [switch]$debug = $false
)

# Author: David Campman
# Description: This script will enable the HTML remote debugging option in the Stream Deck registry and then build the plugin.

# Remove the old plugin
Remove-Item -Path .\Release\com.timekeeper.streamDeckPlugin -Force

# Define the registry path and key name
$registryPath = "HKCU:\Software\Elgato Systems GmbH\StreamDeck"
$keyName = "html_remote_debugging_enabled"

# Set the value based on the debug parameter
$valueToSet = if($debug) { 1 } else { 0 }

# Check if the path exists and create it if it doesn't
if (-not (Test-Path $registryPath)) {
    New-Item -Path $registryPath -Force
}

# Set the DWORD value
Set-ItemProperty -Path $registryPath -Name $keyName -Value $valueToSet -Type DWORD

# Build the plugin
.\DistributionTool.exe -b -i com.timekeeper.sdPlugin -o Release

# Assuming your installer is named PluginInstaller.exe or similar in the Release folder.
# Adjust this line if the installer name or command is different.
.\Release\com.timekeeper.streamDeckPlugin
