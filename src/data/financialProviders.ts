export type FinancialProvider = {
  name: string;
  type: 'Universal bank' | 'Rural bank' | 'Thrift / microfinance bank' | 'ATM' | 'Cooperative / financial institution';
  ownership: 'Government' | 'Private' | 'Cooperative';
  address: string;
  phone?: string;
  email?: string;
  services: string;
  source: string;
  sourceUrl: string;
  mapQuery: string;
  note?: string;
};

export const sipocotFinancialProviders: FinancialProvider[] = [
  {
    name: 'LANDBANK – Sipocot Branch',
    type: 'Universal bank',
    ownership: 'Government',
    address: 'Ramon Marabillon Building, San Juan Avenue, South Centro, Sipocot, Camarines Sur',
    phone: '(054) 881-1626',
    email: 'SipocotBranch@landbank.com',
    services: 'Branch banking, deposits, loans and government financial services; ATM listings are also associated with this location.',
    source: 'LANDBANK official branch directory',
    sourceUrl: 'https://www.landbank.com',
    mapQuery: 'LANDBANK Sipocot Branch Ramon Marabillon Building San Juan Avenue',
  },
  {
    name: 'Rural Bank of Sipocot (Camarines Sur), Inc.',
    type: 'Rural bank',
    ownership: 'Private',
    address: 'San Juan Avenue, South Centro (Poblacion), Sipocot, Camarines Sur 4408',
    phone: '(0977) 240-7259 / (054) 881-0470',
    services: 'Community banking, savings and rural lending; confirm specific products directly with the bank.',
    source: 'PDIC Directory of Insured Rural and Cooperative Banks, 19 November 2025; RBAP Region V directory',
    sourceUrl: 'https://www.pdic.gov.ph/files/BSDStats/Bank%20Directory_RB%20_website.pdf',
    mapQuery: 'Rural Bank of Sipocot San Juan Avenue South Centro Sipocot',
  },
  {
    name: 'BDO Network Bank – Sipocot',
    type: 'Thrift / microfinance bank',
    ownership: 'Private',
    address: 'Unit A, NVS & Sons Corp. Building, San Juan Avenue, Sipocot, Camarines Sur 4408',
    phone: '+63 82 233 7700 ext. 57819',
    services: 'Branch banking, deposits, loans and money transfer services; confirm available transactions with branch.',
    source: 'Public business listing',
    sourceUrl: 'https://www.google.com/maps/search/?api=1&query=BDO+Network+Bank+Sipocot',
    mapQuery: 'BDO Network Bank Sipocot NVS Sons San Juan Avenue',
  },
  {
    name: 'Producers Bank – Sipocot',
    type: 'Thrift / microfinance bank',
    ownership: 'Private',
    address: 'San Juan Avenue, South Centro, Sipocot, Camarines Sur 4408',
    services: 'Savings and lending services; branch-specific products and hours should be confirmed.',
    source: 'Public business listing',
    sourceUrl: 'https://www.google.com/maps/search/?api=1&query=Producers+Bank+Sipocot',
    mapQuery: 'Producers Bank Sipocot San Juan Avenue',
  },
  {
    name: 'CARD Bank, Inc. – Sipocot Branch',
    type: 'Thrift / microfinance bank',
    ownership: 'Private',
    address: 'San Juan Avenue, North Centro, Sipocot, Camarines Sur (QXCG+3VH)',
    services: 'Microfinance-oriented banking and member/client financial services; confirm account and loan eligibility with branch.',
    source: 'Public business listing',
    sourceUrl: 'https://www.google.com/maps/search/?api=1&query=CARD+Bank+Sipocot',
    mapQuery: 'CARD Bank Sipocot San Juan Avenue North Centro',
  },
  {
    name: 'Camsur Multi-Purpose Cooperative – Sipocot Branch',
    type: 'Cooperative / financial institution',
    ownership: 'Cooperative',
    address: 'San Juan Avenue, South Centro, Sipocot, Camarines Sur',
    phone: '+63 954 230 7466',
    email: 'camsurmpc.scosipocotbranch@gmail.com',
    services: 'Cooperative savings, member services and lending products; membership requirements apply.',
    source: 'CamSur MPC official branch directory',
    sourceUrl: 'https://camsurmpc.ph/new/?content=branches',
    mapQuery: 'Camsur Multi Purpose Cooperative Sipocot Branch San Juan Avenue',
  },
  {
    name: 'LANDBANK ATM – Municipal Hall Compound',
    type: 'ATM',
    ownership: 'Government',
    address: 'Municipal Hall Compound, Sipocot, Camarines Sur 4408',
    services: 'ATM cash access; supported transactions and availability depend on machine status.',
    source: 'Public ATM location listing',
    sourceUrl: 'https://www.google.com/maps/search/?api=1&query=Landbank+ATM+Sipocot+Municipal+Hall',
    mapQuery: 'Landbank ATM Municipal Hall Compound Sipocot',
    note: 'ATM only; not a full-service bank branch.',
  },
  {
    name: 'San Isidro Development Cooperative (SIDECO) – Sipocot service point',
    type: 'Cooperative / financial institution',
    ownership: 'Cooperative',
    address: 'Sipocot, Camarines Sur; confirm exact office address before visiting.',
    services: 'Cooperative member financial services and payment facilities; confirm availability at the Sipocot service point.',
    source: 'Public business listing',
    sourceUrl: 'https://www.google.com/maps/search/?api=1&query=San+Isidro+Development+Cooperative+Sipocot',
    mapQuery: 'San Isidro Development Cooperative Sipocot Camarines Sur',
    note: 'Exact street address and walk-in services are not confirmed in the sources reviewed.',
  },
  {
    name: 'NEC Multi-Purpose Cooperative – Sipocot',
    type: 'Cooperative / financial institution',
    ownership: 'Cooperative',
    address: 'QX7G+F6P, Sipocot, Camarines Sur',
    services: 'Cooperative financial services for members; verify products and office access before visiting.',
    source: 'Public business listing',
    sourceUrl: 'https://www.google.com/maps/search/?api=1&query=NEC+Multi+Purpose+Cooperative+Sipocot',
    mapQuery: 'NEC Multi Purpose Cooperative Sipocot',
    note: 'Listing is a cooperative, not a licensed commercial bank branch.',
  },
  {
    name: 'BADEVCO – Sipocot Branch',
    type: 'Cooperative / financial institution',
    ownership: 'Cooperative',
    address: 'Impig, Sipocot, Camarines Sur; confirm exact address before visiting.',
    services: 'Cooperative savings, credit and member services; confirm current branch operations.',
    source: 'Public business listing',
    sourceUrl: 'https://www.google.com/maps/search/?api=1&query=BADEVCO+Sipocot+Branch',
    mapQuery: 'BADEVCO Sipocot Branch Impig',
    note: 'Exact street address and walk-in services should be verified with the cooperative.',
  },
];

export const bankingQuickLinks = [
  { title: 'Commercial & Government Banks', description: 'Universal banks and government-owned banking services.', href: '#bank-directory' },
  { title: 'Rural & Microfinance Banks', description: 'Community banking, savings and lending institutions.', href: '#bank-directory' },
  { title: 'ATMs & Cash Access', description: 'Find listed ATM locations around Sipocot.', href: '#bank-directory' },
  { title: 'Cooperatives & Financial Services', description: 'Member-based savings, credit and cooperative services.', href: '#bank-directory' },
];
