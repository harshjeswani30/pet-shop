import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.review.deleteMany()
  await prisma.petAttribute.deleteMany()
  await prisma.petImage.deleteMany()
  await prisma.pet.deleteMany()
  await prisma.breed.deleteMany()
  await prisma.category.deleteMany()
  await prisma.seller.deleteMany()
  await prisma.newsletter.deleteMany()
  await prisma.contactMessage.deleteMany()

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Dogs & Puppies',
        slug: 'dogs-and-puppies',
        description: 'Find your perfect canine companion from ethical breeders.',
        image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Cats & Kittens',
        slug: 'cats-and-puppets',
        description: 'Adorable feline friends waiting for their forever homes.',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Birds & Handfeed-Chicks',
        slug: 'birds',
        description: 'Beautiful birds and handfeed chicks for bird lovers.',
        image: 'https://images.unsplash.com/photo-1522850949506-5855141de465?q=80&w=1000&auto=format&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Small Exotic Animals',
        slug: 'exotic-animals',
        description: 'Unique and small exotic animals for specialized care.',
        image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1000&auto=format&fit=crop',
      },
    }),
  ])

  const [dogCat, catCat, birdCat, exoticCat] = categories

  // Create Breeds
  const goldenRetriever = await prisma.breed.create({
    data: { name: 'Golden Retriever', categoryId: dogCat.id },
  })
  const germanShepherd = await prisma.breed.create({
    data: { name: 'German Shepherd', categoryId: dogCat.id },
  })
  const persianCat = await prisma.breed.create({
    data: { name: 'Persian Cat', categoryId: catCat.id },
  })
  const cockatiel = await prisma.breed.create({
    data: { name: 'Cockatiel', categoryId: birdCat.id },
  })
  const hamster = await prisma.breed.create({
    data: { name: 'Hamster', categoryId: exoticCat.id },
  })

  // Create Sellers
  const seller1 = await prisma.seller.create({
    data: {
      name: 'Pet Paradise India',
      email: 'contact@petparadise.in',
      phone: '+91 98765 43210',
      address: 'Mumbai, Maharashtra',
      description: 'ISO Certified ethical breeder with 10+ years of experience.',
      rating: 4.8,
    },
  })

  // Create Pets
  const petsData = [
    {
      name: 'Buddy',
      description: 'Friendly Golden Retriever puppy, vaccinated and dewormed.',
      price: 25000,
      oldPrice: 30000,
      categoryId: dogCat.id,
      breedId: goldenRetriever.id,
      sellerId: seller1.id,
      isFeatured: true,
      isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1552053831-71594a27632d'],
      attributes: [
        { type: 'Age', value: 'Puppy' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Golden' },
        { type: 'Coat Type', value: 'Double Coat' },
        { type: 'Certificate', value: 'With KCI' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Luna',
      description: 'Purebred Persian cat with beautiful white coat.',
      price: 15000,
      categoryId: catCat.id,
      breedId: persianCat.id,
      sellerId: seller1.id,
      isHighSold: true,
      images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e'],
      attributes: [
        { type: 'Age', value: 'Kitten' },
        { type: 'Gender', value: 'Female' },
        { type: 'Color', value: 'White' },
        { type: 'Coat Type', value: 'Long' },
        { type: 'Certificate', value: 'Without KCI/INKC' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Max',
      description: 'Strong German Shepherd, great for protection and family.',
      price: 35000,
      oldPrice: 45000,
      categoryId: dogCat.id,
      breedId: germanShepherd.id,
      sellerId: seller1.id,
      isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1589944197705-078bcffbb5a6'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Black & Tan' },
        { type: 'Coat Type', value: 'Double Coat' },
        { type: 'Certificate', value: 'With KCI' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Charlie',
      description: 'Talkative Cockatiel, hand-fed and very friendly.',
      price: 5000,
      categoryId: birdCat.id,
      breedId: cockatiel.id,
      sellerId: seller1.id,
      images: ['https://images.unsplash.com/photo-1552728089-57bdde30ebe3'],
      attributes: [
        { type: 'Age', value: 'Handfeed Chicks' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Grey' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Snowball',
      description: 'Cute Syrian hamster, very active and healthy.',
      price: 1200,
      categoryId: exoticCat.id,
      breedId: hamster.id,
      sellerId: seller1.id,
      images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Pair' },
        { type: 'Color', value: 'White' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
  ]

  for (const p of petsData) {
    const { images, attributes, ...petBase } = p
    const createdPet = await prisma.pet.create({
      data: {
        ...petBase,
        images: {
          create: images.map((url) => ({ url })),
        },
        attributes: {
          create: attributes.map((attr) => ({ type: attr.type, value: attr.value })),
        },
      },
    })

    // Add a review
    await prisma.review.create({
      data: {
        rating: 5,
        comment: 'Excellent pet, very healthy and well-behaved!',
        userName: 'Rahul Sharma',
        petId: createdPet.id,
      },
    })
  }

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
