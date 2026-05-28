# Database Structure

This document explains the database relationships in simple English. The schema is designed as a Supabase/PostgreSQL starting point for a construction and industrial quotation workflow.

Real construction quotations usually require multiple cost categories, not only materials. A more realistic estimate may include fabrication, installation, civil works, electrical work, logistics, equipment, overhead, contingency, and margin.

## cost_categories

`cost_categories` stores the main quotation cost buckets.

Examples:

- `Materials`
- `Fabrication`
- `Installation / Assembly`
- `Civil Works`
- `Electrical Work`
- `Logistics`
- `Equipment / Tools`
- `Overhead`
- `Contingency`

This makes it easier to group quote totals and keep the workflow consistent.

## cost_categories -> materials

Each material belongs to a cost category. In this demo, material records use the `Materials` category.

Example:

- `Steel beam`
- `Roof sheet`
- `Anchor plate`
- `Concrete block`
- `Concrete mesh`

Centralizing materials helps reduce repeated price lookups, inconsistent unit names, and copy/paste errors.

## cost_categories -> labor_items

Labor items belong to categories such as fabrication, installation / assembly, civil works, or electrical work.

Example:

- `Welding work` belongs to `Fabrication`.
- `Installation crew` belongs to `Installation / Assembly`.
- `Site preparation` belongs to `Civil Works`.
- `Lighting installation` belongs to `Electrical Work`.

This makes labor easier to maintain because common work packages can be reused across multiple quotes.

## cost_categories -> service_items

Service items cover reusable non-material costs such as fabrication packages, logistics, and equipment rentals.

Example:

- `Steel structure fabrication` belongs to `Fabrication`.
- `Freight` belongs to `Logistics`.
- `Crane rental` belongs to `Equipment / Tools`.

Separating services from materials keeps the database more realistic and easier to maintain.

## quotes -> quote_items

Each quote can contain many quote items. A quote item is one line in a quotation table.

Example:

- Quote: `Industrial Storage Build - Draft`
- Quote item: `Steel beam`, category `Materials`
- Quote item: `Installation crew`, category `Installation / Assembly`
- Quote item: `Crane rental`, category `Equipment / Tools`

This structure keeps the quote header separate from the detailed calculation lines.

## materials/labor_items/service_items -> quote_items

A quote item can reference a material, labor item, service item, or custom entry. The quote line stores a copied cost snapshot with:

- Category
- Item name
- Description
- Unit
- Quantity
- Unit cost
- Subtotal
- Margin percentage

The cost snapshot matters because old quotations should not automatically change if the reusable catalog is updated later.

## Overhead, Contingency, and Margin

Overhead, contingency, and margin are stored at the quote level in this demo.

- Overhead represents internal operating cost.
- Contingency represents a risk allowance.
- Margin represents the commercial markup applied before final delivery.

Keeping these values separate from line items makes the calculation easier to review and explain.

## Why Centralizing Data Helps

Centralizing materials, labor, services, logistics, equipment, overhead, and margin can reduce:

- Manual cost lookups.
- Copy and paste errors.
- Inconsistent units of measurement.
- Forgotten logistics or equipment costs.
- Missed overhead, contingency, or margin calculations.
- Confusion about which version of a price list was used.

It also makes the workflow easier to review because every quote follows the same structure.
