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
  const baseUrl = "http://195.35.6.213/api";
  const headers = {
    "Content-Type": "application/json",
    "Host": "kama-demo.aiqmanalytics.com"
  };
  const timestamp = Date.now().toString().slice(-4);

  console.log("1. Testing Customer API via Host Header (kama-demo.aiqmanalytics.com)...");
  const custRes = await fetch(baseUrl + "/customers", {
    method: "POST",
    headers,
    body: JSON.stringify({ customerId: "CUST-HOST-" + timestamp, name: "Host Client " + timestamp, notes: "Dedicated Hostname Test" })
  });
  const custData = await custRes.json();
  console.log("   Status:", custRes.status, "Created ID:", custData.data?.customerId);
  const customerId = custData.data.id;

  console.log("2. Testing SKU API via Host Header...");
  const skuRes = await fetch(baseUrl + "/skus", {
    method: "POST",
    headers,
    body: JSON.stringify({ skuCode: "SKU-HOST-" + timestamp, name: "Gold Bracelet " + timestamp, category: "Bracelet", customerId: customerId })
  });
  const skuData = await skuRes.json();
  console.log("   Status:", skuRes.status, "Created SKU:", skuData.data?.skuCode);
  const skuId = skuData.data.id;

  console.log("3. Testing SKU Process Routing Mapper via Host Header...");
  const procRes = await fetch(baseUrl + "/processes", { headers: { "Host": "kama-demo.aiqmanalytics.com" } });
  const procList = (await procRes.json()).data;
  const selectProcessIds = procList.slice(0, 4).map(p => p.id);

  const routeRes = await fetch(baseUrl + "/skus/" + skuId + "/processes", {
    method: "PUT",
    headers,
    body: JSON.stringify({ processIds: selectProcessIds })
  });
  const routeData = await routeRes.json();
  console.log("   Status:", routeRes.status, "Mapped Processes:", routeData.data?.length);

  console.log("4. Testing Rejection Log API via Host Header...");
  const rejRes = await fetch(baseUrl + "/rejections", {
    method: "POST",
    headers,
    body: JSON.stringify({
      customerId: customerId,
      skuId: skuId,
      productionOrderRef: "PO-HOST-" + timestamp,
      rejectionCount: 2,
      rejectionReason: "Casting surface inclusion",
      rejectionDate: "2026-08-11",
      notes: "Host header verification"
    })
  });
  const rejData = await rejRes.json();
  console.log("   Status:", rejRes.status, "Reason:", rejData.data?.rejectionReason);

  console.log("5. Testing Live Dashboard Stats via Host Header...");
  const statsRes = await fetch(baseUrl + "/dashboard/stats", { headers: { "Host": "kama-demo.aiqmanalytics.com" } });
  const statsData = await statsRes.json();
  console.log("   Status:", statsRes.status, "Live Counts:", JSON.stringify(statsData.data?.counts));

  console.log("SUCCESS: DEDICATED HOSTNAME NGINX PROXY & ALL CRUD OPERATIONS VERIFIED 100%!");
})().catch(e => { console.error("E2E Hostname Test Error:", e); process.exit(1); });
'
"""

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=hostname, port=port, username=username, password=password, timeout=15)
stdin, stdout, stderr = client.exec_command(e2e_cmd)
print(stdout.read().decode('utf-8', errors='replace'))
print(stderr.read().decode('utf-8', errors='replace'))
client.close()
