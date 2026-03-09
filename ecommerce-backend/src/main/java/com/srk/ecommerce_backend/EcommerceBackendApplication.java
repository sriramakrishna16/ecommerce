package com.srk.ecommerce_backend;

import com.srk.ecommerce_backend.model.Product;
import com.srk.ecommerce_backend.model.Users;
import com.srk.ecommerce_backend.service.ProductService;
import com.srk.ecommerce_backend.service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.Base64;

@SpringBootApplication
public class EcommerceBackendApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(EcommerceBackendApplication.class, args);


//		ProductService service = context.getBean(ProductService.class);
//		UserService userService = context.getBean(UserService.class);

//
//		Product product1 = new Product("Airdopes","Boat","Electronics",1200,545,"boat.png","Enjoy truly wireless freedom with the boAt Airdopes, crafted for music lovers who demand powerful sound and all-day comfort. These earbuds deliver deep bass, crystal-clear vocals, and a seamless Bluetooth connection, making them perfect for travel, workouts, and daily use. The ergonomic lightweight design ensures a secure fit even during intense activities.\n" +
//				"\n" +
//				"With fast charging and long battery backup, you can enjoy uninterrupted entertainment for hours. The touch controls allow you to manage calls, music, and voice assistants effortlessly without touching your phone.\n" +
//				"\n" +
//				"Key Features:\n" +
//				"\n" +
//				"Deep bass HD sound quality\n" +
//				"\n" +
//				"Bluetooth stable connectivity\n" +
//				"\n" +
//				"Up to 20+ hours playback with charging case\n" +
//				"\n" +
//				"IPX water/sweat resistance\n" +
//				"\n" +
//				"Touch controls & built-in mic");
//		Product product2 = new Product("iPhone Xr","Apple","Electronics",37000,250,"iphoneXr.png","The iPhone XR combines powerful performance with elegant design to give you a premium smartphone experience. Featuring a vibrant Liquid Retina display, advanced camera system, and smooth iOS performance, it is built to handle everything from gaming to photography effortlessly.\n" +
//				"\n" +
//				"Powered by a fast processor, apps launch instantly and multitasking feels seamless. The high-quality camera captures stunning portraits and detailed low-light shots, while the long-lasting battery keeps you going throughout the day.\n" +
//				"\n" +
//				"Key Features:\n" +
//				"\n" +
//				"6.1-inch Liquid Retina HD display\n" +
//				"\n" +
//				"High-performance chipset\n" +
//				"\n" +
//				"Advanced single-lens camera with portrait mode\n" +
//				"\n" +
//				"Face unlock security\n" +
//				"\n" +
//				"Premium glass & aluminum design");
//		Product product3 = new Product("Galaxy S24","Samsung","Electronics",42000,250,"samsung.png","Experience next-generation performance with the Galaxy S24, designed for users who want speed, innovation, and stunning visuals. The ultra-smooth AMOLED display offers vibrant colors and crystal clarity, perfect for streaming, gaming, and browsing.\n" +
//				"\n" +
//				"Equipped with a powerful processor and intelligent camera system, this smartphone captures professional-grade photos and videos in any lighting condition. Its sleek premium build, long battery life, and fast charging make it an ideal daily companion.\n" +
//				"\n" +
//				"Key Features:\n" +
//				"\n" +
//				"Dynamic AMOLED high refresh rate display\n" +
//				"\n" +
//				"Pro-grade AI camera system\n" +
//				"\n" +
//				"Powerful processor for gaming & multitasking\n" +
//				"\n" +
//				"Fast charging & long battery life\n" +
//				"\n" +
//				"Premium slim design");
//		Product product4 = new Product("Victus","Hp","Electronics",72000,25,"hpvictus.png","The HP Victus laptop is built for gamers, creators, and professionals who need serious performance. With a powerful processor and dedicated graphics, it handles heavy applications, gaming, and multitasking with ease. The large full HD display provides immersive visuals, while advanced cooling keeps the system running smoothly during extended use.\n" +
//				"\n" +
//				"Its modern design, fast storage, and long-lasting battery make it perfect for both work and entertainment.\n" +
//				"\n" +
//				"Key Features:\n" +
//				"\n" +
//				"High-speed processor for smooth performance\n" +
//				"\n" +
//				"Dedicated graphics for gaming & editing\n" +
//				"\n" +
//				"Full HD large display\n" +
//				"\n" +
//				"Fast SSD storage\n" +
//				"\n" +
//				"Efficient cooling system");
//		Product product5 = new Product("Running shoe","Adidas","Accessories",1800,2205,"adidas.png","Designed for comfort and durability, Adidas running shoes are perfect for athletes and everyday fitness enthusiasts. The breathable mesh upper keeps your feet cool, while the cushioned midsole absorbs impact and reduces strain during long runs or workouts.\n" +
//				"\n" +
//				"The anti-slip sole ensures excellent grip on all surfaces, making these shoes suitable for gym sessions, outdoor running, and casual wear. Lightweight and stylish, they combine performance with everyday comfort.\n" +
//				"\n" +
//				"Key Features:\n" +
//				"\n" +
//				"Lightweight breathable material\n" +
//				"\n" +
//				"Soft cushioning for shock absorption\n" +
//				"\n" +
//				"Anti-slip durable sole\n" +
//				"\n" +
//				"Comfortable all-day wear\n" +
//				"\n" +
//				"Stylish sporty design");
//		Product product6 = new Product("Smart Watch","AmazFit","Electronics",7000,250,"amazfit.png","Stay connected and track your health with the Amazfit Smart Watch, your perfect fitness and lifestyle companion. It monitors heart rate, steps, calories burned, sleep patterns, and multiple sports activities with high accuracy. The sleek design and vibrant display make it stylish enough for both workouts and office wear.\n" +
//				"\n" +
//				"Receive call, message, and app notifications directly on your wrist while enjoying extended battery life that lasts for days on a single charge.\n" +
//				"\n" +
//				"Key Features:\n" +
//				"\n" +
//				"Heart rate & sleep monitoring\n" +
//				"\n" +
//				"Multiple sports modes\n" +
//				"\n" +
//				"Smart notifications\n" +
//				"\n" +
//				"Long battery life\n" +
//				"\n" +
//				"Lightweight and comfortable design");
//
//		service.saveProducts(product1);
//		service.saveProducts(product2);
//		service.saveProducts(product3);
//		service.saveProducts(product4);
//		service.saveProducts(product5);
//		service.saveProducts(product6);

//		Users user1 = new Users("shivayya","Parvathamma");
//		Users user2 = new Users("sriram","krishna");

//		userService.saveUser(user1);
//		userService.saveUser(user2);


	}

}
