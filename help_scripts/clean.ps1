Remove-Item ./destination -r -fo
Remove-Item ./originFolder -r -fo
Copy-Item "./sample/originFolder" -Destination "./originFolder" -Recurse
Copy-Item "./sample/destination" -Destination "./destination" -Recurse