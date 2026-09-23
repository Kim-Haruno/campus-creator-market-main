# Campus Marketplace

This is a digital marketplace demo web app called "Eduvos Incubation Hub Marketplace" 

where student entrepreneurs can showcase and sell products and services to 

the campus community.

Tech: React + Tailwind + Supabase.

Pages needed:

1. Home — hero, category tiles, featured listings, "how it works"

2. Browse — search bar, category filter chips, sort dropdown, listing grid

3. Listing detail — image, description, price, tags, reviews, seller card, 

   "Contact Seller" and "Place Order" buttons

4. Seller public profile — LinkedIn-style header, bio, skills, stats, listings

5. Seller dashboard — stats cards, my listings, activity feed, create-listing form

6. Admin — moderation queue with approve/reject, stat cards

Data model:

- users (id, name, email, role, campus, avatar, bio)

- listings (id, seller_id, title, description, price, category, type, image, tags)

- reviews (id, listing_id, author_id, rating, text)

- orders (id, buyer_id, listing_id, status, amount)

Style: clean, modern, indigo/blue theme, rounded cards, soft shadows.

No login required for the demo — use mock data.

## How to run

```sh
npm i
npm run dev
```
