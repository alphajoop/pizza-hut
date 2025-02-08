import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Mail, Phone, Star, Truck } from "lucide-react";

interface Pizza {
  id: number;
  name: string;
  image: string;
  description?: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const pizzaVariants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 10, scale: 0.9 },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [selectedPizza, setSelectedPizza] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Pizzas");

  const pizzas: Pizza[] = [
    {
      id: 1,
      name: "Guardian Love Classic",
      image: "pizza-1.jpg",
      description: "Notre pizza classique signature avec garnitures de qualité supérieure",
    },
    {
      id: 2,
      name: "Guardian Love Spéciale",
      image: "pizza-2.jpg",
      description: "Un mélange spécial de saveurs uniques",
    },
    {
      id: 3,
      name: "Guardian Love Végétarienne",
      image: "pizza-3.jpg",
      description: "Légumes frais et fromages de qualité supérieure",
    },
    {
      id: 4,
      name: "Guardian Love Suprême",
      image: "pizza-4.jpg",
      description: "L'expérience ultime de la pizza",
    },
  ];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Margherita Classique",
      description: "Tomates, mozzarella, basilic frais",
      price: "6.000",
      category: "Pizzas",
      image: "pizza-1.jpg",
    },
    {
      id: 2,
      name: "Quattro Formaggi",
      description: "Mozzarella, gorgonzola, parmesan, chèvre",
      price: "7.500",
      category: "Pizzas",
      image: "pizza-1.jpg",
    },
    {
      id: 3,
      name: "Tiramisu Maison",
      description: "Recette traditionnelle italienne",
      price: "2.000",
      category: "Desserts",
      image: "pizza-1.jpg",
    },
    {
      id: 4,
      name: "Panna Cotta",
      description: "Coulis de fruits rouges",
      price: "1.700",
      category: "Desserts",
      image: "pizza-1.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <nav className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-16">
          <motion.img
            src="logo.png"
            alt="Pizza Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
          <div className="flex gap-4 sm:gap-8 text-sm sm:text-base">
            {["Menu", "Order", "Online"].map((item) => (
              <motion.button
                key={item}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-3 py-2 hover:text-orange-500 hover:bg-white/80 rounded-full transition-all duration-300 font-medium"
              >
                {item}
              </motion.button>
            ))}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              Sign up
            </motion.button>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24">
          <div className="space-y-8 order-2 lg:order-1">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-base sm:text-lg font-medium text-orange-500 tracking-wide">
                Aujourd'hui, c'est la pizza
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                Amour gardien
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                {pizzas[selectedPizza].description ||
                  "Est sed sapien vestibulum ultrices massa. Aliquet quis faucibus vel ut mauris tellus sapien ligula amet."}
              </p>
            </motion.div>

            <div className="flex items-center gap-4 sm:gap-6">
              {pizzas.map((pizza, index) => (
                <motion.div
                  key={pizza.id}
                  className={`relative cursor-pointer rounded-full overflow-hidden
                    ${
                      selectedPizza === index
                        ? "ring-4 ring-orange-500 ring-opacity-50"
                        : "hover:ring-2 hover:ring-orange-300"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setIsHovered(index)}
                  onHoverEnd={() => setIsHovered(null)}
                  onClick={() => setSelectedPizza(index)}
                >
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className={`object-cover transition-all duration-300
                      ${
                        selectedPizza === index
                          ? "scale-110 w-20 h-20 sm:w-28 sm:h-28"
                          : "scale-100 w-16 h-16 sm:w-24 sm:h-24"
                      }`}
                  />
                  {isHovered === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded-md"
                    >
                      {pizza.name}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative order-1 lg:order-2 z-50">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-500/5 rounded-full filter blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPizza}
                variants={pizzaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <motion.img
                  src={pizzas[selectedPizza].image}
                  alt={pizzas[selectedPizza].name}
                  className="w-full rounded-full shadow-2xl hover:shadow-orange-500/20 transition-shadow duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8 text-orange-500" />,
                title: "Qualité Premium",
                description: "Ingrédients frais sélectionnés avec soin",
              },
              {
                icon: <Clock className="w-8 h-8 text-orange-500" />,
                title: "Livraison Rapide",
                description: "30 minutes maximum ou pizza offerte",
              },
              {
                icon: <Truck className="w-8 h-8 text-orange-500" />,
                title: "Zone Étendue",
                description: "Livraison dans toute la ville",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {item.icon}
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Notre Menu
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-4 mb-8"
            >
              {["Pizzas", "Desserts"].map((category) => (
                <motion.button
                  key={category}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300
                    ${
                      activeCategory === category
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-600 hover:bg-orange-50"
                    }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {menuItems
                .filter((item) => item.category === activeCategory)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <span className="text-orange-500 font-semibold">
                          {item.price}FCFA
                        </span>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
              <p className="text-gray-600 mb-8">
                Une question ? Une suggestion ? N'hésitez pas à nous contacter !
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-gray-600">01 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contact@pizzahut.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <textarea
                placeholder="Votre message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                Envoyer
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default App;
