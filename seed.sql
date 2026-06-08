-- Seed data for Courses
INSERT INTO courses (id, title, description) VALUES
('c1', 'Introduction to React', 'Learn the basics of React, components, state, and props.'),
('c2', 'Advanced Next.js', 'Master Server Components, App Router, and full-stack Next.js patterns.'),
('c3', 'Python Data Science', 'Data analysis, pandas, and data visualization basics in Python.'),
('c4', 'DevOps Fundamentals', 'Introduction to CI/CD, Docker containers, and basic deployment strategies.'),
('c5', 'Modern CSS Mastery', 'Learn Tailwind CSS, Grid, Flexbox, and responsive design techniques.');

-- Seed data for Lessons
INSERT INTO lessons (id, course_id, title, material) VALUES
-- Course 1: React
('l1_1', 'c1', 'React Components', '["Components are the building blocks of any React application. Think of them as independent, reusable pieces of UI.", "A component is fundamentally a JavaScript function that returns React elements describing what should appear on the screen."]'),
('l1_2', 'c1', 'State and Props', '["State and Props are two of the most important concepts in React. They control how data flows through your components.", "Props are used to pass data from a parent down to a child component, while state is managed internally by the component."]'),
('l1_3', 'c1', 'Hooks Basics', '["Hooks let you use state and other React features without writing a class. The most common hooks are useState and useEffect.", "useEffect allows you to perform side effects in function components, such as data fetching or subscriptions."]'),
('l1_4', 'c1', 'Event Handling', '["Handling events with React elements is very similar to handling events on DOM elements, but with camelCase naming conventions.", "You pass a function as the event handler rather than a string, which makes React events highly predictable and easy to compose."]'),
('l1_5', 'c1', 'Conditional Rendering', '["In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.", "You can use JavaScript operators like if or the conditional operator to create elements representing the current state."]'),

-- Course 2: Next.js
('l2_1', 'c2', 'App Router Basics', '["The App Router introduces a new paradigm for routing, data fetching, and layouts in Next.js.", "By defining folders inside the app directory, you automatically create nested routes that seamlessly map to UI."]'),
('l2_2', 'c2', 'Server Components', '["React Server Components allow developers to build applications that span the server and client. They execute only on the server, resulting in zero bundle size.", "This architecture reduces the amount of JavaScript sent to the browser, significantly improving performance."]'),
('l2_3', 'c2', 'Server Actions', '["Server Actions are asynchronous functions that are executed on the server. They can be called directly from Client Components.", "This drastically simplifies form handling and data mutations without needing to manually build API endpoints."]'),
('l2_4', 'c2', 'Data Fetching', '["Next.js extends the native fetch Web API to allow you to configure caching and revalidating behavior for each fetch request.", "You can fetch data directly in Server Components using async/await syntax."]'),
('l2_5', 'c2', 'Static and Dynamic Rendering', '["By default, Next.js tries to statically render your routes to optimize performance and reduce server load.", "If you use dynamic functions like cookies() or searchParams, the route will opt into dynamic rendering at request time."]'),

-- Course 3: Python Data Science
('l3_1', 'c3', 'Python Basics', '["Python is a versatile programming language that excels in data analysis due to its massive ecosystem of data science libraries.", "You can write simple scripts to load datasets or complex algorithms to predict trends."]'),
('l3_2', 'c3', 'Pandas Series', '["A Pandas Series is a one-dimensional labeled array capable of holding data of any type (integer, string, float, python objects, etc.).", "The axis labels are collectively called the index, allowing for rapid lookups and powerful filtering."]'),
('l3_3', 'c3', 'Pandas DataFrames', '["A DataFrame is a 2-dimensional labeled data structure with columns of potentially different types.", "Think of it like a spreadsheet or SQL table, or a dictionary of Series objects. It is generally the most commonly used pandas object."]'),
('l3_4', 'c3', 'Matplotlib Plotting', '["Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python.", "It is highly customizable and allows you to plot line graphs, histograms, power spectra, bar charts, errorcharts, and scatterplots with just a few lines of code."]'),
('l3_5', 'c3', 'Data Cleaning', '["Data cleaning involves fixing or removing incorrect, corrupted, incorrectly formatted, duplicate, or incomplete data within a dataset.", "In Python, methods like dropna() and fillna() provide immediate tools to handle missing records safely."]'),

-- Course 4: DevOps
('l4_1', 'c4', 'What is DevOps?', '["DevOps is a set of practices that combines software development (Dev) and IT operations (Ops).", "It aims to shorten the systems development life cycle and provide continuous delivery with high software quality."]'),
('l4_2', 'c4', 'Version Control', '["Version control systems track changes to your codebase over time, allowing multiple developers to collaborate without conflicting.", "Git is the absolute industry standard, enabling feature branching, pull requests, and distributed version control."]'),
('l4_3', 'c4', 'Docker Basics', '["Docker allows you to package an application with all of its dependencies into a standardized unit for software development.", "Containers run exactly the same way regardless of the environment, eliminating the ''it works on my machine'' problem."]'),
('l4_4', 'c4', 'CI/CD Pipelines', '["Continuous Integration and Continuous Deployment (CI/CD) automate the testing and deployment of code.", "When a developer pushes code, automated runners can test it immediately, and if successful, deploy the artifact directly to production."]'),
('l4_5', 'c4', 'Infrastructure as Code', '["Infrastructure as Code (IaC) is the managing and provisioning of computer data centers through machine-readable definition files.", "Tools like Terraform or AWS CloudFormation allow you to version-control your infrastructure just like application code."]'),

-- Course 5: CSS
('l5_1', 'c5', 'The Box Model', '["The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.", "Understanding the box model is the foundation to laying out elements accurately on a webpage."]'),
('l5_2', 'c5', 'Flexbox Fundamentals', '["The Flexible Box Layout Module, makes it easier to design flexible responsive layout structure without using float or positioning.", "Flexbox solves the problem of centering elements vertically and distributing space within a container dynamically."]'),
('l5_3', 'c5', 'CSS Grid', '["CSS Grid Layout excels at dividing a page into major regions or defining the relationship in terms of size, position, and layer, between parts of a control built from HTML primitives.", "Unlike Flexbox which is 1-dimensional, Grid allows you to build layout rules across both rows and columns."]'),
('l5_4', 'c5', 'Tailwind Utilities', '["Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.", "Instead of writing custom CSS classes, you apply pre-existing utility classes directly in your HTML to style elements quickly."]'),
('l5_5', 'c5', 'Responsive Design', '["Responsive web design makes your web page look good on all devices by using CSS media queries.", "By defining breakpoints, layout characteristics change to accommodate the user''s viewport, ensuring content remains readable on mobile phones."] ');


-- Seed data for Questions
INSERT INTO questions (id, lesson_id, text) VALUES
('q_react_1', 'l1_1', 'What is a React component?'),
('q_react_2', 'l1_2', 'Which of the following is true about Props?'),
('q_react_3', 'l1_3', 'What hook is used to perform side effects?'),

('q_next_1', 'l2_1', 'How does the App Router map to the UI?'),
('q_next_2', 'l2_2', 'Where do React Server Components execute?'),

('q_py_1', 'l3_3', 'What is a Pandas DataFrame?'),
('q_py_2', 'l3_5', 'Which method handles missing data in Pandas?'),

('q_dev_1', 'l4_3', 'What problem does Docker solve?'),
('q_dev_2', 'l4_4', 'What does CI/CD stand for?'),

('q_css_1', 'l5_2', 'Is Flexbox primarily 1-dimensional or 2-dimensional?'),
('q_css_2', 'l5_4', 'What is Tailwind CSS?');

-- Seed data for Answers
INSERT INTO answers (id, question_id, text, is_correct) VALUES
-- q_react_1
('a_r1_1', 'q_react_1', 'A reusable piece of UI', TRUE),
('a_r1_2', 'q_react_1', 'A database schema', FALSE),
('a_r1_3', 'q_react_1', 'A CSS framework', FALSE),

-- q_react_2
('a_r2_1', 'q_react_2', 'They are managed internally and can be changed freely', FALSE),
('a_r2_2', 'q_react_2', 'They are passed from parent to child and are read-only', TRUE),

-- q_react_3
('a_r3_1', 'q_react_3', 'useState', FALSE),
('a_r3_2', 'q_react_3', 'useEffect', TRUE),
('a_r3_3', 'q_react_3', 'useTransition', FALSE),

-- q_next_1
('a_n1_1', 'q_next_1', 'By creating a single index.js file with a massive switch statement', FALSE),
('a_n1_2', 'q_next_1', 'By defining nested folders inside the app directory', TRUE),

-- q_next_2
('a_n2_1', 'q_next_2', 'In the client browser', FALSE),
('a_n2_2', 'q_next_2', 'Only on the server', TRUE),
('a_n2_3', 'q_next_2', 'In a separate Docker container automatically', FALSE),

-- q_py_1
('a_p1_1', 'q_py_1', 'A 2-dimensional labeled data structure', TRUE),
('a_p1_2', 'q_py_1', 'A 1-dimensional labeled array', FALSE),

-- q_py_2
('a_p2_1', 'q_py_2', 'dropna()', TRUE),
('a_p2_2', 'q_py_2', 'remove_nulls()', FALSE),
('a_p2_3', 'q_py_2', 'clean()', FALSE),

-- q_dev_1
('a_d1_1', 'q_dev_1', 'It improves CSS compilation speed', FALSE),
('a_d1_2', 'q_dev_1', 'It eliminates the "it works on my machine" problem', TRUE),

-- q_dev_2
('a_d2_1', 'q_dev_2', 'Continuous Integration / Continuous Deployment', TRUE),
('a_d2_2', 'q_dev_2', 'Code Integrity / Code Delivery', FALSE),

-- q_css_1
('a_c1_1', 'q_css_1', '1-dimensional', TRUE),
('a_c1_2', 'q_css_1', '2-dimensional', FALSE),

-- q_css_2
('a_c2_1', 'q_css_2', 'A JavaScript framework', FALSE),
('a_c2_2', 'q_css_2', 'A utility-first CSS framework', TRUE);
