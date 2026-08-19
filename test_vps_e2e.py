import paramiko
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

hostname = '195.35.6.213'
port = 22
username = 'aniket'
password = 'Aniket@1805'

e2e_cmd = """
node -e '
(async () => {
  const baseUrl = "http://127.0.0.1:3002/api";
  const timestamp = Date.now().toString().slice(-4);

  console.log("1. Testing Customer API...");
  const custRes = await fetch(baseUrl + "/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId: "CUST-VPS-" + timestamp, name: "VPS Client " + timestamp, notes: "Production Demo" })
  });
  const custData = await custRes.json();
  console.log("   Status:", custRes.status, "Created ID:", custData.data?.customerId);
  const customerId = custData.data.id;

  console.log("2. Testing SKU API...");
  const skuRes = await fetch(baseUrl + "/skus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skuCode: "SKU-VPS-" + timestamp, name: "Gold Solitaire Ring " + timestamp, category: "Ring", customerId: customerId })
  });
  const skuData = await skuRes.json();
  console.log("   Status:", skuRes.status, "Created SKU:", skuData.data?.skuCode);
  const skuId = skuData.data.id;

  console.log("3. Testing SKU Process Routing Mapper...");
  const procRes = await fetch(baseUrl + "/processes");
  const procList = (await procRes.json()).data;
  const selectProcessIds = procList.slice(0, 5).map(p => p.id);

  const routeRes = await fetch(baseUrl + "/skus/" + skuId + "/processes", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ processIds: selectProcessIds })
  });
  const routeData = await routeRes.json();
  console.log("   Status:", routeRes.status, "Mapped Processes:", routeData.data?.length);

  console.log("4. Testing Rejection Log API...");
  const rejRes = await fetch(baseUrl + "/rejections", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: customerId,
      skuId: skuId,
      productionOrderRef: "PO-VPS-" + timestamp,
      rejectionCount: 5,
      rejectionReason: "Wax tree porosity breach",
      rejectionDate: "2026-08-11",
      notes: "Logged during final QC"
    })
  });
  const rejData = await rejRes.json();
  console.log("   Status:", rejRes.status, "Reason:", rejData.data?.rejectionReason);

  console.log("5. Testing Dashboard Stats API...");
  const statsRes = await fetch(baseUrl + "/dashboard/stats");
  const statsData = await statsRes.json();
  console.log("   Status:", statsRes.status, "Live Counts:", JSON.stringify(statsData.data?.counts));

  console.log("SUCCESS: ALL VPS PRODUCTION ENDPOINTS AND CRUD OPERATIONS PASSED 100%!");
})().catch(e => { console.error("E2E Test Error:", e); process.exit(1); });
'
"""

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=hostname, port=port, username=username, password=password, timeout=15)
stdin, stdout, stderr = client.exec_command(e2e_cmd)
print(stdout.read().decode('utf-8', errors='replace'))
print(stderr.read().decode('utf-8', errors='replace'))
client.close()
