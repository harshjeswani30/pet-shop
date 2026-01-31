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
        slug: 'cats-and-kittens',
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
  const dogBreeds = await Promise.all([
    prisma.breed.create({ data: { name: 'Golden Retriever', categoryId: dogCat.id } }),
    prisma.breed.create({ data: { name: 'German Shepherd', categoryId: dogCat.id } }),
    prisma.breed.create({ data: { name: 'Labrador Retriever', categoryId: dogCat.id } }),
    prisma.breed.create({ data: { name: 'Beagle', categoryId: dogCat.id } }),
    prisma.breed.create({ data: { name: 'Pug', categoryId: dogCat.id } }),
  ])

  const catBreeds = await Promise.all([
    prisma.breed.create({ data: { name: 'Persian Cat', categoryId: catCat.id } }),
    prisma.breed.create({ data: { name: 'Maine Coon', categoryId: catCat.id } }),
    prisma.breed.create({ data: { name: 'Siamese Cat', categoryId: catCat.id } }),
    prisma.breed.create({ data: { name: 'Bengal Cat', categoryId: catCat.id } }),
  ])

  const birdBreeds = await Promise.all([
    prisma.breed.create({ data: { name: 'Cockatiel', categoryId: birdCat.id } }),
    prisma.breed.create({ data: { name: 'African Grey Parrot', categoryId: birdCat.id } }),
    prisma.breed.create({ data: { name: 'Budgerigar', categoryId: birdCat.id } }),
    prisma.breed.create({ data: { name: 'Macaw', categoryId: birdCat.id } }),
  ])

  const exoticBreeds = await Promise.all([
    prisma.breed.create({ data: { name: 'Hamster', categoryId: exoticCat.id } }),
    prisma.breed.create({ data: { name: 'Guinea Pig', categoryId: exoticCat.id } }),
    prisma.breed.create({ data: { name: 'Rabbit', categoryId: exoticCat.id } }),
    prisma.breed.create({ data: { name: 'Iguana', categoryId: exoticCat.id } }),
  ])

  const [goldenRetriever, germanShepherd, labrador, beagle, pug] = dogBreeds
  const [persianCat, maineCoon, siamese, bengal] = catBreeds
  const [cockatiel, africanGrey, budgie, macaw] = birdBreeds
  const [hamster, guineaPig, rabbit, iguana] = exoticBreeds

  // Create Sellers
  const sellers = await Promise.all([
    prisma.seller.create({
      data: {
        name: 'Pet Paradise India',
        email: 'contact@petparadise.in',
        phone: '+91 98765 43210',
        address: 'Mumbai, Maharashtra',
        description: 'ISO Certified ethical breeder with 10+ years of experience.',
        rating: 4.8,
      },
    }),
    prisma.seller.create({
      data: {
        name: 'Royal Pets Delhi',
        email: 'info@royalpets.in',
        phone: '+91 88888 77777',
        address: 'New Delhi, Delhi',
        description: 'Premium pets and supplies in the heart of Delhi.',
        rating: 4.5,
      },
    }),
  ])

  const [seller1, seller2] = sellers

  // Create Pets
  const petsData = [
    // Dogs
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
      name: 'Cooper',
      description: 'Playful Labrador Retriever, loves water and fetching.',
      price: 22000,
      categoryId: dogCat.id,
      breedId: labrador.id,
      sellerId: seller2.id,
      isHighSold: true,
      images: ['https://images.unsplash.com/photo-1552053831-71594a27632d'],
      attributes: [
        { type: 'Age', value: 'Puppy' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Golden' },
        { type: 'Coat Type', value: 'Short' },
        { type: 'Certificate', value: 'With KCI' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Bella',
      description: 'Sweet Beagle, excellent sense of smell and very energetic.',
      price: 18000,
      categoryId: dogCat.id,
      breedId: beagle.id,
      sellerId: seller2.id,
      images: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Female' },
        { type: 'Color', value: 'White' },
        { type: 'Coat Type', value: 'Short' },
        { type: 'Certificate', value: 'Without KCI/INKC' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Rocky',
      description: 'Adorable Pug, loves to cuddle and very lazy.',
      price: 12000,
      categoryId: dogCat.id,
      breedId: pug.id,
      sellerId: seller1.id,
      images: ['https://images.unsplash.com/photo-1517849845537-4d257902454a'],
      attributes: [
        { type: 'Age', value: 'Puppy' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Fawn' },
        { type: 'Coat Type', value: 'Short' },
        { type: 'Certificate', value: 'Without KCI/INKC' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Daisy',
      description: 'Energetic Labrador, great with kids.',
      price: 24000,
      oldPrice: 30000,
      categoryId: dogCat.id,
      breedId: labrador.id,
      sellerId: seller1.id,
      images: ['https://images.unsplash.com/photo-1552053831-71594a27632d'],
      attributes: [
        { type: 'Age', value: 'Puppy' },
        { type: 'Gender', value: 'Female' },
        { type: 'Color', value: 'Black' },
        { type: 'Coat Type', value: 'Short' },
        { type: 'Certificate', value: 'With KCI' },
      ],
    },
    // Cats
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
      name: 'Simba',
      description: 'Large Maine Coon, very gentle and affectionate.',
      price: 20000,
      categoryId: catCat.id,
      breedId: maineCoon.id,
      sellerId: seller2.id,
      images: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Grey' },
        { type: 'Coat Type', value: 'Long' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Misty',
      description: 'Elegant Siamese cat, very vocal and smart.',
      price: 18000,
      categoryId: catCat.id,
      breedId: siamese.id,
      sellerId: seller1.id,
      images: ['https://images.unsplash.com/photo-1513245543132-31f507417b26'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Female' },
        { type: 'Color', value: 'Cream' },
        { type: 'Coat Type', value: 'Short' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Leo',
      description: 'Stunning Bengal cat with leopard-like spots.',
      price: 45000,
      oldPrice: 60000,
      categoryId: catCat.id,
      breedId: bengal.id,
      sellerId: seller2.id,
      isFeatured: true,
      images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Brown' },
        { type: 'Coat Type', value: 'Short' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Oliver',
      description: 'Friendly Persian kitten, loves to play with strings.',
      price: 16000,
      categoryId: catCat.id,
      breedId: persianCat.id,
      sellerId: seller1.id,
      isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'],
      attributes: [
        { type: 'Age', value: 'Kitten' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Grey' },
        { type: 'Coat Type', value: 'Long' },
      ],
    },
    // Birds
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
      name: 'Alex',
      description: 'African Grey Parrot, highly intelligent and can mimic many words.',
      price: 85000,
      categoryId: birdCat.id,
      breedId: africanGrey.id,
      sellerId: seller2.id,
      isFeatured: true,
      images: ['https://images.unsplash.com/photo-1522850949506-5855141de465'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Grey' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Bluey',
      description: 'Colorful Budgerigar, small and easy to care for.',
      price: 800,
      categoryId: birdCat.id,
      breedId: budgie.id,
      sellerId: seller1.id,
      images: ['https://images.unsplash.com/photo-1552728089-57bdde30ebe3'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Pair' },
        { type: 'Color', value: 'Blue & White' },
      ],
    },
    {
      name: 'Sky',
      description: 'Beautiful Blue Budgie, very active.',
      price: 900,
      categoryId: birdCat.id,
      breedId: budgie.id,
      sellerId: seller2.id,
      images: ['https://images.unsplash.com/photo-1552728089-57bdde30ebe3'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Blue & White' },
      ],
    },
    {
      name: 'Sunny',
      description: 'Yellow Cockatiel, whistles beautifully.',
      price: 5500,
      categoryId: birdCat.id,
      breedId: cockatiel.id,
      sellerId: seller1.id,
      images: ['https://images.unsplash.com/photo-1552728089-57bdde30ebe3'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Golden' },
      ],
    },
    {
      name: 'Rio',
      description: 'Magnificent Blue and Gold Macaw.',
      price: 150000,
      categoryId: birdCat.id,
      breedId: macaw.id,
      sellerId: seller2.id,
      images: ['https://images.unsplash.com/photo-1552728089-57bdde30ebe3'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Blue & White' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    // Exotic
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
    {
      name: 'Nibbles',
      description: 'Dwarf hamster, very small and cute.',
      price: 1000,
      categoryId: exoticCat.id,
      breedId: hamster.id,
      sellerId: seller1.id,
      images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Grey' },
      ],
    },
    {
      name: 'Ginger',
      description: 'Friendly Guinea Pig, loves fresh vegetables.',
      price: 2500,
      categoryId: exoticCat.id,
      breedId: guineaPig.id,
      sellerId: seller2.id,
      images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Female' },
        { type: 'Color', value: 'Red & White' },
      ],
    },
    {
      name: 'Coco',
      description: 'Brown Guinea Pig, very vocal.',
      price: 2600,
      categoryId: exoticCat.id,
      breedId: guineaPig.id,
      sellerId: seller2.id,
      images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Brown' },
      ],
    },
    {
      name: 'Thumper',
      description: 'Soft Holland Lop Rabbit, very calm temperament.',
      price: 4000,
      categoryId: exoticCat.id,
      breedId: rabbit.id,
      sellerId: seller1.id,
      isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Grey' },
        { type: 'Adoptive Type', value: 'Tamed' },
      ],
    },
    {
      name: 'Iggy',
      description: 'Green Iguana, for experienced reptile owners.',
      price: 12000,
      categoryId: exoticCat.id,
      breedId: iguana.id,
      sellerId: seller2.id,
      images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7'],
      attributes: [
        { type: 'Age', value: 'Adult' },
        { type: 'Gender', value: 'Male' },
        { type: 'Color', value: 'Grizzle' },
        { type: 'Adoptive Type', value: 'Wild' },
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
        reviewerName: 'Rahul Sharma',
        petId: createdPet.id,
        sellerId: seller1.id,
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
