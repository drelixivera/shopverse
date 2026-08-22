// src/data/products.js
export const products = [
  // ===== ELECTRONICS =====
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c30d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"
    ],
    category: "Electronics",
    description: "Experience crystal-clear audio with active noise cancellation and 30-hour battery life. Premium comfort for all-day listening.",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "Minimalist Backpack",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
    ],
    category: "Fashion",
    description: "Waterproof, durable backpack with laptop compartment and sleek design. Perfect for daily commutes and travel.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 3,
    name: "Smart Fitness Tracker",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Electronics",
    description: "Track your heart rate, sleep, and activity with this premium fitness band. Water-resistant with 7-day battery life.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug Set",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Home",
    description: "Set of 4 handcrafted ceramic mugs with minimalist design. Microwave and dishwasher safe.",
    rating: 4.7,
    inStock: false
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33d38f5d?w=400&h=400&fit=crop"
    ],
    category: "Electronics",
    description: "RGB mechanical keyboard with Cherry MX switches and programmable keys. Perfect for gaming and productivity.",
    rating: 4.9,
    inStock: true
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Sports",
    description: "Eco-friendly, non-slip yoga mat with alignment lines. Perfect for all types of yoga and fitness exercises.",
    rating: 4.3,
    inStock: true
  },

  // ===== NEW PRODUCTS =====
  // Electronics
  {
    id: 7,
    name: "Wireless Charging Pad",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Electronics",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Electronics",
    description: "Portable Bluetooth speaker with 360° sound, 20-hour battery life, and waterproof design. Perfect for outdoor adventures.",
    rating: 4.7,
    inStock: true
  },

  // Fashion
  {
    id: 9,
    name: "Leather Wallet",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Fashion",
    description: "Premium genuine leather wallet with 6 card slots and RFID blocking technology. Compact and durable.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 10,
    name: "Sunglasses Classic",
    price: 69.99,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Fashion",
    description: "Classic aviator sunglasses with polarized lenses. UV400 protection and lightweight frame for all-day comfort.",
    rating: 4.4,
    inStock: true
  },

  // Home
  {
    id: 11,
    name: "Essential Oil Diffuser",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2a5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2a5?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Home",
    description: "Ultrasonic aromatherapy diffuser with 7-color LED lights. Creates a calming atmosphere with your favorite essential oils.",
    rating: 4.3,
    inStock: true
  },
  {
    id: 12,
    name: "Plant Pot Set",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Home",
    description: "Set of 3 modern ceramic plant pots with drainage holes. Perfect for indoor plants and succulents.",
    rating: 4.2,
    inStock: true
  },

  // Sports
  {
    id: 13,
    name: "Dumbbell Set",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1581009146145-b5b050b1f2f4?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581009146145-b5b050b1f2f4?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Sports",
    description: "Adjustable dumbbell set with weight plates. Perfect for home workouts and strength training.",
    rating: 4.8,
    inStock: true
  },
  {
    id: 14,
    name: "Resistance Bands Set",
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1598439210625-5067c578f3d6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598439210625-5067c578f3d6?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Sports",
    description: "Set of 5 resistance bands with different resistance levels. Ideal for stretching, yoga, and strength training.",
    rating: 4.5,
    inStock: true
  },

  // Beauty
  {
    id: 15,
    name: "Skincare Set",
    price: 54.99,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Beauty",
    description: "Complete skincare set with cleanser, toner, serum, and moisturizer. Natural ingredients for glowing skin.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 16,
    name: "Makeup Brush Set",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Beauty",
    description: "Professional 12-piece makeup brush set with vegan bristles. Includes all essential brushes for flawless application.",
    rating: 4.6,
    inStock: true
  },

  // Kitchen
  {
    id: 17,
    name: "Chef Knife Set",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Kitchen",
    description: "Professional chef knife set with 3 essential knives. High-carbon stainless steel with ergonomic handles.",
    rating: 4.8,
    inStock: true
  },
  {
    id: 18,
    name: "Cast Iron Skillet",
    price: 44.99,
    images: [
      "https://images.unsplash.com/photo-1584990347449-f0b5f725e171?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584990347449-f0b5f725e171?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Kitchen",
    description: "Pre-seasoned cast iron skillet. Even heat distribution and durable construction for years of cooking.",
    rating: 4.7,
    inStock: true
  },

  // Books
  {
    id: 19,
    name: "Cookbook: Healthy Recipes",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Books",
    description: "Hardcover cookbook with 100+ healthy recipes. Beautiful photography and easy-to-follow instructions.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 20,
    name: "Journal Notebook",
    price: 14.99,
    images: [
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Books",
    description: "Premium leather-bound journal with 200 pages of acid-free paper. Perfect for writing, sketching, and journaling.",
    rating: 4.5,
    inStock: true
  }
];