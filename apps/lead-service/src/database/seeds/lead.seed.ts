import { DataSource } from 'typeorm';
import { Lead } from '../../api/lead/entities/lead.entity';
import { LeadStatus } from '../../api/lead/enums/lead-status';

export async function seedLeads(dataSource: DataSource): Promise<void> {
  const leadRepository = dataSource.getRepository(Lead);

  // Check if leads already exist
  const existingLeads = await leadRepository.count();
  if (existingLeads > 0) {
    console.log('Leads already seeded, skipping...');
    return;
  }

  const leads = [
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1-555-0123',
      address: '123 Main Street, Suite 100',
      city: 'New York',
      country: 'USA',
      postalCode: '10001',
      company: 'TechCorp Inc.',
      department: 'Engineering',
      position: 'Senior Developer',
      manager: 'Jane Doe',
      managerEmail: 'jane.doe@techcorp.com',
      managerPhone: '+1-555-0124',
      status: LeadStatus.NEW,
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1-555-0125',
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      country: 'USA',
      postalCode: '90210',
      company: 'Marketing Solutions LLC',
      department: 'Marketing',
      position: 'Marketing Manager',
      manager: 'Mike Wilson',
      managerEmail: 'mike.wilson@marketingsolutions.com',
      managerPhone: '+1-555-0126',
      status: LeadStatus.CONTACTED,
    },
    {
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+1-555-0127',
      address: '789 Pine Street',
      city: 'Chicago',
      country: 'USA',
      postalCode: '60601',
      company: 'Finance Group',
      department: 'Finance',
      position: 'Financial Analyst',
      manager: 'Lisa Anderson',
      managerEmail: 'lisa.anderson@financegroup.com',
      managerPhone: '+1-555-0128',
      status: LeadStatus.WON,
    },
    {
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+1-555-0129',
      address: '321 Elm Street',
      city: 'Houston',
      country: 'USA',
      postalCode: '77001',
      company: 'Healthcare Systems',
      department: 'Operations',
      position: 'Operations Director',
      manager: 'Robert Taylor',
      managerEmail: 'robert.taylor@healthcaresystems.com',
      managerPhone: '+1-555-0130',
      status: LeadStatus.LOST,
    },
    {
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      phone: '+1-555-0131',
      address: '654 Maple Drive',
      city: 'Phoenix',
      country: 'USA',
      postalCode: '85001',
      company: 'Retail Solutions',
      department: 'Sales',
      position: 'Sales Representative',
      manager: 'Jennifer Garcia',
      managerEmail: 'jennifer.garcia@retailsolutions.com',
      managerPhone: '+1-555-0132',
      status: LeadStatus.NEW,
    },
  ];

  for (const leadData of leads) {
    const lead = leadRepository.create(leadData);
    await leadRepository.save(lead);
  }

  console.log(`Seeded ${leads.length} leads`);
}
