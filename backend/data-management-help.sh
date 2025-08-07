#!/bin/bash

echo "🍽️ Food Website Data Management Helper"
echo "======================================"
echo ""

echo "Available commands:"
echo "1. Add sample data:        npm run seed:sample"
echo "2. Add Swiggy data:        npm run seed:swiggy"  
echo "3. Add more custom data:   node add-more-data.js"
echo "4. Clear all data:         node add-more-data.js -clear"
echo "5. Test API endpoints:     node test-restaurant-api.js"
echo ""

echo "Example API calls:"
echo ""
echo "📝 Create a new restaurant:"
echo 'curl -X POST http://localhost:5000/api/restaurants \\'
echo '  -H "Content-Type: application/json" \\'
echo '  -d {"name":"New Restaurant","cuisine":["Italian"],"rating":4.5,"imageUrl":"https://example.com/image.jpg","menu":[]}'
echo ""

echo "📋 Get all restaurants:"
echo "curl http://localhost:5000/api/restaurants"
echo ""

echo "🍕 Add menu item to restaurant:"
echo 'curl -X POST http://localhost:5000/api/restaurants/RESTAURANT_ID/menu \\'
echo '  -H "Content-Type: application/json" \\'
echo '  -d {"name":"Pizza","description":"Delicious pizza","price":15.99,"isVeg":true}'
echo ""

echo "🔄 Bulk create restaurants:"
echo 'curl -X POST http://localhost:5000/api/restaurants/bulk \\'
echo '  -H "Content-Type: application/json" \\'
echo '  -d {"restaurants":[{"name":"Restaurant 1","cuisine":["Italian"],"rating":4.0,"imageUrl":"https://example.com/1.jpg","menu":[]}]}'
