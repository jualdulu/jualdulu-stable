import {PrismaClient} from "@prisma/client";
import * as process from "process";

const prisma = new PrismaClient();

async function main() {
  // create super admin
  const user = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'haqi@jualdulu.com',
      role: "SUPERADMIN",
    }
  });

  // create membership product
  const dropshiperProduct = await prisma.product.create({
    data: {
      code: 'JD001',
      name: 'Dropshiper Registration',
      description: '',
      userId: user.id,
      variants: {
        create: [
          {
            price: 799000,
            discountPrice: 79900,
            stock: -1,
            weight: 0
          }
        ]
      }
    }
  });
  const supplierProduct = await prisma.product.create({
    data: {
      code: 'JD002',
      name: 'Supplier Registration',
      description: '',
      userId: user.id,
      variants: {
        create: [
          {
            price: 0,
            discountPrice: 0,
            stock: -1,
            weight: 0
          }
        ]
      }
    }
  });

  // add setting
  await prisma.setting.createMany({
    data: [
      {key: 'dropshiper-registration-product-id', value: dropshiperProduct.id},
      {key: 'supplier-registration-product-id', value: supplierProduct.id},
    ]
  })

  await prisma.$disconnect()
}

main().catch(e => {
  console.error(e);
  process.exit(1);
})