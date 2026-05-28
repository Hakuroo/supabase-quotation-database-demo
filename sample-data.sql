-- Fictional sample data for the Supabase Quotation Database Demo.
-- These costs are invented for portfolio demonstration only.

insert into cost_categories (name, description, is_direct_cost, display_order) values
  ('Materials', 'Physical construction materials used in the estimate.', true, 1),
  ('Fabrication', 'Shop or pre-site preparation work for structural components.', true, 2),
  ('Installation / Assembly', 'On-site assembly and installation activities.', true, 3),
  ('Civil Works', 'Site preparation, concrete, and foundation support activities.', true, 4),
  ('Electrical Work', 'Basic electrical and lighting work for industrial projects.', true, 5),
  ('Logistics', 'Freight, transport, and material handling costs.', true, 6),
  ('Equipment / Tools', 'Rental equipment and tools required for execution.', true, 7),
  ('Overhead', 'Internal operating cost applied as a percentage.', false, 8),
  ('Contingency', 'Risk allowance applied as a percentage.', false, 9)
on conflict (name) do nothing;

insert into materials (category_id, name, description, unit, unit_cost) values
  (
    (select id from cost_categories where name = 'Materials'),
    'Steel beam',
    'Fictional structural steel beam.',
    'linear meter',
    82.50
  ),
  (
    (select id from cost_categories where name = 'Materials'),
    'Roof sheet',
    'Fictional industrial roof sheet.',
    'square meter',
    18.40
  ),
  (
    (select id from cost_categories where name = 'Materials'),
    'Anchor plate',
    'Fictional anchor plate.',
    'unit',
    12.75
  ),
  (
    (select id from cost_categories where name = 'Materials'),
    'Concrete block',
    'Fictional concrete block.',
    'unit',
    2.80
  ),
  (
    (select id from cost_categories where name = 'Materials'),
    'Concrete mesh',
    'Fictional reinforcement mesh.',
    'square meter',
    7.90
  )
on conflict do nothing;

insert into labor_items (category_id, name, description, unit, unit_cost) values
  (
    (select id from cost_categories where name = 'Fabrication'),
    'Welding work',
    'Fictional welding labor for fabricated structure components.',
    'hour',
    58.00
  ),
  (
    (select id from cost_categories where name = 'Fabrication'),
    'Cutting and preparation',
    'Fictional cutting and preparation labor.',
    'hour',
    46.00
  ),
  (
    (select id from cost_categories where name = 'Installation / Assembly'),
    'Installation crew',
    'Fictional daily installation crew.',
    'day',
    420.00
  ),
  (
    (select id from cost_categories where name = 'Installation / Assembly'),
    'Steel structure assembly',
    'Fictional assembly labor for steel structure components.',
    'day',
    510.00
  ),
  (
    (select id from cost_categories where name = 'Installation / Assembly'),
    'Roof panel installation',
    'Fictional roof panel installation labor.',
    'day',
    390.00
  ),
  (
    (select id from cost_categories where name = 'Civil Works'),
    'Site preparation',
    'Fictional site preparation labor.',
    'day',
    310.00
  ),
  (
    (select id from cost_categories where name = 'Civil Works'),
    'Concrete floor labor',
    'Fictional concrete floor labor.',
    'day',
    360.00
  ),
  (
    (select id from cost_categories where name = 'Civil Works'),
    'Foundation support labor',
    'Fictional foundation support labor.',
    'day',
    430.00
  ),
  (
    (select id from cost_categories where name = 'Electrical Work'),
    'Basic electrical installation',
    'Fictional basic electrical installation labor.',
    'day',
    340.00
  ),
  (
    (select id from cost_categories where name = 'Electrical Work'),
    'Lighting installation',
    'Fictional lighting installation labor.',
    'day',
    280.00
  )
on conflict do nothing;

insert into service_items (category_id, name, description, unit, unit_cost) values
  (
    (select id from cost_categories where name = 'Fabrication'),
    'Steel structure fabrication',
    'Fictional fabrication package for structural steel.',
    'package',
    1450.00
  ),
  (
    (select id from cost_categories where name = 'Logistics'),
    'Freight',
    'Fictional freight cost for material delivery.',
    'trip',
    520.00
  ),
  (
    (select id from cost_categories where name = 'Logistics'),
    'Material handling',
    'Fictional on-site material handling service.',
    'day',
    210.00
  ),
  (
    (select id from cost_categories where name = 'Equipment / Tools'),
    'Crane rental',
    'Fictional crane rental cost.',
    'day',
    780.00
  ),
  (
    (select id from cost_categories where name = 'Equipment / Tools'),
    'Welding equipment',
    'Fictional welding equipment rental.',
    'day',
    120.00
  ),
  (
    (select id from cost_categories where name = 'Equipment / Tools'),
    'Lifting tools',
    'Fictional lifting tools package.',
    'day',
    95.00
  )
on conflict do nothing;
