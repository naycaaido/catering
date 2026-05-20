import { Role, Status } from '../src/generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';
const prisma = new DatabaseService();

async function main() {
  const defaultPassword =
    '$2b$10$UclYwfkQI//6zfDPyiXbbe5EBqVM1QkUJriNkk4kCwIWImEUKdsvK';

  await prisma.testimonial.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.mealPlan.deleteMany();
  await prisma.address.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.adminProfile.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: defaultPassword,
      role: Role.ADMIN,
      adminProfile: {
        create: {
          fullName: 'Admin Utama',
        },
      },
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      password: defaultPassword,
      role: Role.USER,
      customerProfile: {
        create: {
          fullName: 'Budi Santoso',
          phoneNumber: '081234567890',
          address: {
            create: [
              {
                label: 'Rumah',
                detailAlamat:
                  'Jl. Dipatiukur No. 112, Coblong, Kota Bandung, Jawa Barat',
                isDefault: true,
              },
              {
                label: 'Kantor',
                detailAlamat:
                  'Jl. Diponegoro No. 22, Citarum, Kota Bandung, Jawa Barat',
                isDefault: false,
              },
              {
                label: 'Kosan',
                detailAlamat:
                  'Jl. Dago Asri No. 10, Dago, Kota Bandung, Jawa Barat',
                isDefault: false,
              },
            ],
          },
        },
      },
    },
    include: {
      customerProfile: true,
    },
  });

  const mealPlansData = [
    {
      name: 'Paket Hemat 7 Hari',
      price: 350000,
      description: 'Paket makan siang selama 7 hari.',
    },
    {
      name: 'Paket Premium 14 Hari',
      price: 800000,
      description: 'Makan siang dan malam kualitas premium.',
    },
    {
      name: 'Paket Diet Keto 7 Hari',
      price: 450000,
      description: 'Khusus untuk program diet ketogenic.',
    },
    {
      name: 'Paket Bulking 30 Hari',
      price: 1500000,
      description: 'Tinggi protein untuk menambah massa otot.',
    },
    {
      name: 'Paket Vegan 7 Hari',
      price: 400000,
      description: '100% plant-based meal plan.',
    },
    {
      name: 'Paket Vegetarian 14 Hari',
      price: 750000,
      description: 'Menu vegetarian lezat tanpa daging.',
    },
    {
      name: 'Paket Jantung Sehat 30 Hari',
      price: 1600000,
      description: 'Rendah kolesterol dan sodium.',
    },
    {
      name: 'Paket Diabetes Care 14 Hari',
      price: 850000,
      description: 'Rendah gula dengan karbohidrat kompleks.',
    },
    {
      name: 'Paket Kantoran 5 Hari',
      price: 250000,
      description: 'Praktis untuk makan siang di kantor.',
    },
    {
      name: 'Paket Family (4 Orang) 7 Hari',
      price: 1200000,
      description: 'Porsi keluarga untuk 7 hari.',
    },
  ];

  await prisma.mealPlan.createMany({
    data: mealPlansData,
  });

  const mealPlans = await prisma.mealPlan.findMany();

  if (customer.customerProfile && mealPlans.length > 0) {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const selectedPlan = mealPlans[0];

    const subscription = await prisma.subscription.create({
      data: {
        userId: customer.customerProfile.id,
        phoneNumber: customer.customerProfile.phoneNumber,
        planId: selectedPlan.id,
        mealType: 'Lunch',
        deliveryDays: 'Senin - Jumat',
        allergies: 'Udang',
        status: Status.ACTIVE,
        endDate: thirtyDaysFromNow,
        pausePeriodeStart: new Date(),
        pausePeriodeEnd: new Date(),
      },
    });

    await prisma.testimonial.create({
      data: {
        customerId: customer.customerProfile.id,
        subscriptionId: subscription.id,
        review: 'Makanannya sangat enak dan pengirimannya selalu tepat waktu!',
        rating: 5,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
