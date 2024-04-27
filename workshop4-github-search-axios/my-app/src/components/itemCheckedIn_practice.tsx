import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

interface ChecklistItem {
  id: number;
  name: string;
  price: number;
  checked: boolean;
}

export default function StoreChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // State variable to track total price

  // Function to fetch checklist items from the server
  const fetchItems = async () => {
    try {
      const response = await axios.get<ChecklistItem[]>("/api/items"); // Adjust URL as needed
      setItems(response.data); // Assuming the server responds with an array of items
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Function to update the server when an item is checked or unchecked
  const updateItemStatus = async (itemId: number, checked: boolean) => {
    try {
      await axios.post("/api/updateItem", { id: itemId, checked }); // Adjust URL and payload as needed
    } catch (error) {
      console.error("Error updating item status:", error);
    }
  };

  // Function to handle the checkout process
  const handleCheckout = async () => {
    // You can perform additional checkout actions here, such as sending the list of purchased items to the server
    setIsCheckedOut(true);
  };

  useEffect(() => {
    fetchItems(); // Fetch items when the component mounts
  }, []);

  useEffect(() => {
    // Calculate total price whenever items change
    const checkedItems = items.filter((item) => item.checked);
    const totalPrice = checkedItems.reduce((acc, curr) => acc + curr.price, 0);
    setTotalPrice(totalPrice);
  }, [items]);

  const handleToggleCheck = async (itemId: number) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems); // Update UI immediately

    // Update server with the new status
    try {
      await updateItemStatus(
        itemId,
        !items.find((item) => item.id === itemId)!.checked
      );
    } catch (error) {
      console.error("Error updating item status:", error);
      // If there's an error, revert the UI to the previous state
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      );
    }
  };

  return (
    <div className="store-checklist">
      <h2>Store Checklist</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggleCheck(item.id)}
              />
              {item.name} - ${item.price}
            </label>
          </li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice.toFixed(2)}</p> {/* Display total price */}
      <button onClick={handleCheckout} disabled={isCheckedOut}>
        {isCheckedOut ? "Checked Out" : "Checkout"}
      </button>
    </div>
  );
}
