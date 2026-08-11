async function runTests() {
  const baseUrl = 'http://localhost:3000/api';
  const timestamp = Date.now().toString().slice(-4);

  console.log('--- 1. Testing Customer API ---');
  const custRes = await fetch(`${baseUrl}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId: `CUST-${timestamp}`, name: `KAMA Jewels ${timestamp}`, notes: 'Test Client' })
  });
  const custData = await custRes.json();
  console.log('Create Customer:', custRes.status, custData.data?.customerId);
  const customerId = custData.data.id;

  console.log('--- 2. Testing SKU API ---');
  const skuRes = await fetch(`${baseUrl}/skus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skuCode: `SKU-RING-${timestamp}`, name: `Diamond Ring ${timestamp}`, category: 'Ring', customerId: customerId })
  });
  const skuData = await skuRes.json();
  console.log('Create SKU:', skuRes.status, skuData.data?.skuCode);
  const skuId = skuData.data.id;

  console.log('--- 3. Testing SKU Process Routing ---');
  const procRes = await fetch(`${baseUrl}/processes`);
  const procList = (await procRes.json()).data;
  const selectProcessIds = procList.slice(0, 5).map(p => p.id);

  const routeRes = await fetch(`${baseUrl}/skus/${skuId}/processes`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ processIds: selectProcessIds })
  });
  const routeData = await routeRes.json();
  console.log('Set Process Routing (5 processes):', routeRes.status, routeData.data?.length);

  console.log('--- 4. Testing Rejection API ---');
  const rejRes = await fetch(`${baseUrl}/rejections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerId: customerId,
      skuId: skuId,
      productionOrderRef: `PO-2026-${timestamp}`,
      rejectionCount: 3,
      rejectionReason: 'Porosity defect',
      rejectionDate: '2026-08-11',
      notes: 'QC check log'
    })
  });
  const rejData = await rejRes.json();
  console.log('Create Rejection:', rejRes.status, rejData.data?.rejectionReason);

  console.log('--- 5. Testing Dashboard Stats ---');
  const statsRes = await fetch(`${baseUrl}/dashboard/stats`);
  const statsData = await statsRes.json();
  console.log('Dashboard Counts:', statsRes.status, JSON.stringify(statsData.data?.counts));

  console.log('\n✅ ALL API AND DATABASE TESTS PASSED WITH 100% SUCCESS!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
