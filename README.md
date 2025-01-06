### **Notes**

- When deleting a category, the system first checks if any products are linked to it.
- If products are associated, the category is removed from them before the category is deleted.

**Reasoning:**  
This approach prevents invalid references, preserves order history, and avoids unintended data loss.
