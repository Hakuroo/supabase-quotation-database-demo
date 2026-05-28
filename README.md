# Supabase Quotation Database Demo

A demo project showing how a Supabase-style database can centralize materials, costs, and quotation logic to reduce repetitive budget calculation tasks.

This is a fictional portfolio demo based on a real business problem: teams often need to estimate materials, fabrication, installation / assembly, civil works, electrical work, logistics, equipment, overhead, contingency, margin, and quotation totals using repeated manual calculations. The goal of this repository is to show practical data organization, quotation workflow thinking, and a small frontend demo with transparent calculation logic.

## Why This Project Exists

Quotation work can become repetitive when material costs, labor items, service packages, logistics costs, equipment rentals, overhead, contingency, and margins are stored across spreadsheets, messages, and old documents. A centralized database can help teams keep reusable data in one place and reduce repeated lookup or calculation work.

This project demonstrates how Supabase, PostgreSQL, SQL, HTML, CSS, JavaScript, data structuring, quotation workflow, and AI-assisted planning can support a cleaner digital production process.

## Problem

Manual quotation workflows can create common issues:

- Material, labor, service, logistics, and equipment costs are copied from old files.
- Fabrication, installation, civil, and electrical estimates are calculated differently by different people.
- Overhead and contingency are tracked separately or forgotten.
- Margins are applied manually and can be missed.
- Quote line items are hard to review.
- Repetitive budget calculations take time away from higher-value work.

## Solution

This demo proposes a simple quotation database structure where:

- Materials are stored separately from labor and service items.
- Fabrication, installation / assembly, civil works, electrical work, logistics, and equipment are organized by cost category.
- Overhead, contingency, and margin are calculated as separate quotation layers.
- Quotes contain reusable quote line items.
- Unit costs, quantities, subtotals, overhead, contingency, margin, and totals are calculated clearly.
- Final quotations are reviewed manually before being shared.

The frontend demo simulates the quotation logic without connecting to a live Supabase project.

## Database Structure

The SQL files provide a Supabase/PostgreSQL starting point:

- `cost_categories` stores quotation cost groups.
- `materials` stores reusable fictional construction materials and unit costs.
- `labor_items` stores reusable fictional labor cost items.
- `service_items` stores reusable fictional service, logistics, and equipment items.
- `quotes` stores quotation-level information such as project name, overhead, contingency, margin, and total.
- `quote_items` stores individual quote lines linked to a quote.

See:

- [schema.sql](schema.sql)
- [sample-data.sql](sample-data.sql)
- [docs/database-structure.md](docs/database-structure.md)

## Functional Demo

Live Demo placeholder:

[https://hakuroo.github.io/supabase-quotation-database-demo/](https://hakuroo.github.io/supabase-quotation-database-demo/)

The functional demo is located at:

`examples/quotation-demo.html`

It includes:

- A cost category selector.
- Fictional items for materials, fabrication, installation / assembly, civil works, electrical work, logistics, and equipment.
- Quantity input.
- Add item workflow.
- Quote table with category subtotals.
- Overhead, contingency, and margin inputs.
- Final estimated total calculation.
- Quotation summary generator.

## Tools Used

- Supabase-style data modeling
- PostgreSQL
- SQL
- HTML
- CSS
- JavaScript
- Data structuring
- Quotation workflow planning
- AI-assisted planning

## What This Project Demonstrates

- Shows how a business workflow can be translated into database tables.
- Highlights why centralized material, labor, service, logistics, and equipment data can reduce repetitive manual work.
- Demonstrates relationships between cost categories, materials, labor items, service items, quotes, and quote line items.
- Shows a small functional frontend for a more realistic construction and industrial quotation workflow.
- Demonstrates how overhead, contingency, and margin fit into a structured estimate.
- Highlights why fictional sample data should be separated from real business data and confidential information.

## Disclaimer

This is a fictional demo project using sample data. It does not include private client data, confidential business information, or real pricing.

## Contact

Add portfolio, LinkedIn, and email details here before publishing the repository.
