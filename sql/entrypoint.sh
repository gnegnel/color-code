set -e
/opt/mssql/bin/sqlservr &
echo "Waiting for SQL Server..."
sleep 30s
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i start.sql
tail -f /dev/null
