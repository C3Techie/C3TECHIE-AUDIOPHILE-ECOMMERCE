import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    // Customer Information
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    
    // Shipping Information
    shippingAddress: v.object({
      address: v.string(),
      city: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    
    // Order Items
    items: v.array(
      v.object({
        id: v.number(),
        name: v.string(),
        slug: v.optional(v.string()),
        image: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    
    // Payment Information
    paymentMethod: v.string(),
    
    // Order Totals
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),
    
    // Order Status
    status: v.string(), // "pending", "processing", "shipped", "delivered", "cancelled"
    
    // Timestamps
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("created_at", ["createdAt"]),
});
