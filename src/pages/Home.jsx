import { useState } from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';



const GAMES = [
  { id: 1, title: 'Wooden Sofa Set 5', price: 59999, image: 'https://m.media-amazon.com/images/I/81EtvPKRowL.jpg' },
  { id: 2, title: 'Modern Bedroom', price: 49999, image: 'https://image.made-in-china.com/2f0j00dnvqkMYzkBbr/Modern-Bedroom-Home-House-Furniture-King-Size-Adult-Double-Storage-Wooden-Bed.webp' },
  { id: 3, title: 'Engineered Wood Wooden ', price: 39999, image: 'https://5.imimg.com/data5/SELLER/Default/2023/8/336430706/IY/TI/GC/32658229/wooden-home-furnitures.png' },
  { id: 4, title: 'Furniculture Wooden Foldable', price: 44499, image: 'https://5.imimg.com/data5/SELLER/Default/2024/2/391048247/BL/IA/JX/193258969/foldable-home-furnitures.png' },
  { id: 5, title: 'Reclaimed Wooden Furniture', price: 44399, image: 'https://content.jdmagicbox.com/comp/namakkal/c3/9999p4286.4286.230102194950.v7c3/catalogue/kerala-wood-furnitures-ayilpatti-namakkal-wooden-furniture-leg-manufacturers-lgj8gnsm75.jpg' },
  { id: 6, title: 'NCR Classic Style', price: 12299, image: 'https://www.royalzig.com/uploads/2020/11/NCR-Classic-Style-Walnut-Antique-Finish-Living-Room-Furniture.jpg' },
  { id: 7, title: 'Modular Furniture', price: 45599, image: 'https://desaradesign.com/wp-content/uploads/2023/09/embracing-mesmerizing-world-modular-furniture.jpg' },
  { id: 8, title: 'Office Furniture', price: 44899, image: 'https://res.cloudinary.com/hni-corporation/image/upload/d_allsteel-fallback-image_jy84n9.jpg/f_auto,q_auto/v1724339079/Allsteel/Images/Environment/Environment_Rise%20Lounge_Boxes_001.png' },
  { id: 9, title: 'Reception Chairs', price: 44299, image: 'https://commercialtraders.co.nz/cdn/shop/collections/Reception_chairs.jpg?v=1715830478&width=1296' },
  { id: 10, title: 'Soft Rock Sofa', price: 43599, image: 'https://www.urban-office.com/images/products/soft/softrock/softrock_009.jpg' },
  { id: 11, title: 'Loungebank Softrock Straight', price: 44799, image: 'https://www.officetopper.com/cdn/resize/630/media/catalog/product/s/o/softrock_-_configuratie_2.jpg' },
  { id: 12, title: 'Luxurious Club Armchair ', price: 78899, image: 'https://houseproudfurnishings.com/cdn/shop/collections/Arnison-Collection-900x604.jpg?v=1703083055' },
  { id: 13, title: 'Parkar Chair', price: 72699, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUxi4mdRB5x9l6QWySXCn-JM1sD9s0uS_Hlw&s' },
  { id: 14, title: 'Dinning Chairs', price: 15899, image: 'https://www.mmfurniture.com.au/wp-content/uploads/2022/10/IMG_8906.jpg' },
  { id: 15, title: ' Modern Lounge Chair', price: 14799, image: 'https://ouchcart.com/cdn/shop/files/il_794xN.4169856402_4wo1.webp?v=1725090609' },
  { id: 16, title: 'Egg Lounge Chair', price: 89599, image: 'https://dk7e3dsghw78b.cloudfront.net/sites/files/watelier/productimg/202109/800x800/FRITZ-Swan-3.jpg' },
    { id: 17, title: 'Fabric Recliner Couch ', price: 78599, image: 'https://m.media-amazon.com/images/I/71S54DTEhTL.jpg'
  },
  { id: 18, title: 'Leather recliner Sofa', price: 85599, image: 'https://images-cdn.ubuy.co.in/667beee3a43e852b346ec5cd-furniliving-pu-leather-recliner-chair.jpg'
  },
   
  { id: 19, title: 'Ottoman Sofa', price: 96999, image: 'https://media-uk.landmarkshops.in/cdn-cgi/image/h=750,w=750,q=85,fit=cover/homecentre/1000010248177-1000010248176_06-2100.jpg' },
  { id: 20, title: 'Wise Max Furniture', price: 47799, image:  'https://s.alicdn.com/@sc04/kf/H619dfb5904b84615af921776b62ca39bN.jpg_720x720q50.jpgg'}
];

export default function Home() {
  const { addToCart, addToLastViewed } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = GAMES.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameClick = (game) => {
    addToLastViewed(game);
  };

  const handleAddToCart = (game) => {
    addToCart(game);
    toast.success(`${game.title} added to cart!`);
  };

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map(game => (
          <div key={game.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => handleGameClick(game)}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-4">Rs. {game.price}</p>
              <button
                onClick={() => handleAddToCart(game)}
                className="w-full bg-blue-600 text-yellow-400 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}