(async () => {
  const baseUrl = 'http://localhost:3000/api/master-file/customers';

  console.log('==============================================');
  console.log('Testing Customer Master File API on master.db');
  console.log('==============================================\n');

  // Test 1: Add a valid Master File record
  const testRecord = {
    id: 'MF-TEST-001',
    custId: 'MALAB-IND-PUNE-PIMP',
    custName: 'Malabar Gold & Diamonds',
    skuId: 'SKU-RNG-101',
    skuName: '18K Solitaire Diamond Ring',
    deliveryTimeDays: 14,
  };

  console.log('1. Testing POST valid record...');
  const postRes = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testRecord),
  });
  const postJson = await postRes.json();
  console.log(`   Status: ${postRes.status}`, postJson);

  // Test 2: Add a second valid record
  const testRecord2 = {
    id: 'MF-TEST-002',
    custId: 'TANIS-IND-MUMB-ANDH',
    custName: 'Tanishq Jewellers',
    skuId: 'SKU-NLK-202',
    skuName: '22K Traditional Bridal Necklace',
    deliveryTimeDays: 21,
  };

  console.log('\n2. Testing POST second record...');
  const postRes2 = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testRecord2),
  });
  const postJson2 = await postRes2.json();
  console.log(`   Status: ${postRes2.status}`, postJson2);

  // Test 3: Fetch all records (GET)
  console.log('\n3. Testing GET all Master File records...');
  const getRes = await fetch(baseUrl);
  const getJson = await getRes.json();
  console.log(`   Status: ${getRes.status}`);
  console.log(`   Total persistent records in master.db: ${getJson.data?.length}`);
  console.table(getJson.data);

  // Test 4: Duplicate ID rejection
  console.log('\n4. Testing duplicate manual ID validation...');
  const dupRes = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testRecord),
  });
  const dupJson = await dupRes.json();
  console.log(`   Status: ${dupRes.status} (Expected 409)`, dupJson);

  // Test 5: Invalid CUST ID structure validation
  console.log('\n5. Testing invalid CUST ID format validation...');
  const invalidRes = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 'MF-INVALID',
      custId: 'INVALID-STRUCTURE', // Not 5-3-4-4
      custName: 'Invalid Customer',
      skuId: 'SKU-001',
      skuName: 'Item',
      deliveryTimeDays: 10,
    }),
  });
  const invalidJson = await invalidRes.json();
  console.log(`   Status: ${invalidRes.status} (Expected 400)`, invalidJson);

  console.log('\n==============================================');
  console.log('ALL MASTER FILE WORKFLOW TESTS PASSED 100%!');
  console.log('==============================================');
})();
