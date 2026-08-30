import fs from "fs";
import path from "path";

const BLOG_BASE_URL = "https://muskunishitha.vercel.app";
const rootDir = process.cwd();
const blogDir = path.join(rootDir, "content", "blogs");
const imageDir = path.join(rootDir, "public", "assets", "blog");

const originalFiles = new Set([
  "react-performance.mdx",
  "react-native-guide.mdx",
  "nextjs-guide.mdx",
  "node-express-rest-apis.mdx",
  "mongodb-full-stack-developers.mdx",
  "redux-toolkit-react-applications.mdx",
  "react-native-android-deployment.mdx",
  "building-responsive-websites-react.mdx",
]);

const originalTitles = {
  "react-performance-optimization": "React.js Performance Optimization",
  "react-native-android-app-development": "React Native Android App Development",
  "nextjs-modern-web-development": "Next.js for Modern Web Development",
  "node-express-rest-apis": "Building REST APIs with Node.js and Express.js",
  "mongodb-full-stack-developers": "MongoDB for Full Stack Developers",
  "redux-toolkit-react-applications": "Redux Toolkit for React Applications",
  "react-native-android-deployment": "React Native Android Deployment",
  "building-responsive-websites-react": "Building Responsive Websites with React",
};

const snippets = {
  jsAsync: {
    language: "js",
    code: `let requestId = 0;

async function loadProducts(query) {
  const currentRequest = requestId + 1;
  requestId = currentRequest;

  const response = await fetch("/api/products?search=" + encodeURIComponent(query));
  const data = await response.json();

  if (currentRequest !== requestId) return;
  setProducts(data.products);
}`,
  },
  jsTransform: {
    language: "js",
    code: `const visibleProducts = products
  .filter((product) => product.isActive)
  .map((product) => ({
    id: product._id,
    title: product.name,
    priceLabel: "Rs. " + product.price,
  }))
  .sort((a, b) => a.title.localeCompare(b.title));`,
  },
  reactComponent: {
    language: "jsx",
    code: `function ProductCard({ product, onOpen }) {
  return (
    <article className="rounded-lg border p-4">
      <h3>{product.title}</h3>
      <p>{product.shortDescription}</p>
      <button type="button" onClick={() => onOpen(product.id)}>
        View details
      </button>
    </article>
  );
}`,
  },
  reactForm: {
    language: "jsx",
    code: `async function handleSubmit(event) {
  event.preventDefault();
  setStatus("submitting");

  const result = await saveContact(form);

  if (!result.ok) {
    setErrors(result.errors);
    setStatus("error");
    return;
  }

  setStatus("success");
}`,
  },
  reactFetch: {
    language: "jsx",
    code: `useEffect(() => {
  const controller = new AbortController();

  async function loadDashboard() {
    setState({ status: "loading", data: null, error: null });

    try {
      const response = await fetch("/api/dashboard", {
        signal: controller.signal,
      });
      const data = await response.json();
      setState({ status: "success", data, error: null });
    } catch (error) {
      if (error.name !== "AbortError") {
        setState({ status: "error", data: null, error });
      }
    }
  }

  loadDashboard();
  return () => controller.abort();
}, []);`,
  },
  reactEffect: {
    language: "jsx",
    code: `useEffect(() => {
  if (!userId) return;

  let isCurrent = true;

  getUserProfile(userId).then((profile) => {
    if (isCurrent) setProfile(profile);
  });

  return () => {
    isCurrent = false;
  };
}, [userId]);`,
  },
  reactBoundary: {
    language: "jsx",
    code: `function EmptyState({ title, message, action }) {
  return (
    <section role="status" className="rounded-lg border p-6 text-center">
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </section>
  );
}`,
  },
  accessibility: {
    language: "jsx",
    code: `<label htmlFor="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  aria-describedby="email-error"
/>
<p id="email-error" role="alert">
  Enter a valid email address.
</p>`,
  },
  tailwind: {
    language: "jsx",
    code: `const buttonVariants = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "border border-border bg-bg-card text-text-body",
};

function Button({ variant = "primary", className = "", ...props }) {
  return (
    <button
      className={"inline-flex items-center rounded-lg px-4 py-2 " + buttonVariants[variant] + " " + className}
      {...props}
    />
  );
}`,
  },
  muiForm: {
    language: "jsx",
    code: `<TextField
  label="Product name"
  value={form.name}
  onChange={(event) => updateField("name", event.target.value)}
  error={Boolean(errors.name)}
  helperText={errors.name || "Use the customer-facing product name."}
  fullWidth
/>`,
  },
  bootstrapLayout: {
    language: "jsx",
    code: `<div className="container py-4">
  <div className="row g-4">
    <aside className="col-12 col-lg-3">Filters</aside>
    <main className="col-12 col-lg-9">Product grid</main>
  </div>
</div>`,
  },
  nextMetadata: {
    language: "js",
    code: `export async function generateMetadata({ params }) {
  const post = getBlogPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: "/blog/" + post.slug,
    },
    openGraph: {
      type: "article",
      images: [post.image],
    },
  };
}`,
  },
  nextDynamic: {
    language: "jsx",
    code: `export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }) {
  const post = getBlogPostBySlug(params.slug);
  return <BlogArticle post={post} />;
}`,
  },
  nextImage: {
    language: "jsx",
    code: `<div className="relative aspect-[16/9] overflow-hidden rounded-lg">
  <Image
    src={project.image}
    alt={project.title}
    fill
    priority={isAboveTheFold}
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />
</div>`,
  },
  nextApiRoute: {
    language: "js",
    code: `export async function POST(request) {
  const body = await request.json();
  const result = validateContact(body);

  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 400 });
  }

  await sendContactEmail(result.data);
  return Response.json({ ok: true });
}`,
  },
  rnNavigation: {
    language: "jsx",
    code: `navigation.navigate("OrderDetails", {
  orderId: order._id,
  from: "orders",
});

useFocusEffect(
  useCallback(() => {
    refetchOrder();
  }, [orderId])
);`,
  },
  rnPermissions: {
    language: "js",
    code: `const status = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

if (status === RESULTS.GRANTED) {
  await registerDeviceForPush();
} else {
  setPermissionMessage("Notifications are optional, but order updates may be delayed.");
}`,
  },
  rnPush: {
    language: "js",
    code: `messaging().onMessage(async (remoteMessage) => {
  showInAppNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    data: remoteMessage.data,
  });
});`,
  },
  rnFlatList: {
    language: "jsx",
    code: `<FlatList
  data={orders}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => <OrderCard order={item} />}
  initialNumToRender={8}
  maxToRenderPerBatch={10}
  windowSize={7}
  removeClippedSubviews
/>`,
  },
  rnReleaseConfig: {
    language: "bash",
    code: `cd android
./gradlew clean
./gradlew assembleRelease
./gradlew bundleRelease`,
  },
  expressController: {
    language: "js",
    code: `export async function getProjects(req, res, next) {
  try {
    const projects = await Project.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
}`,
  },
  expressMiddleware: {
    language: "js",
    code: `export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  req.user = verifyToken(token);
  next();
}`,
  },
  jwt: {
    language: "js",
    code: `const token = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);`,
  },
  validation: {
    language: "js",
    code: `function validateProjectInput(body) {
  const errors = {};

  if (!body.title?.trim()) errors.title = "Title is required.";
  if (!body.description?.trim()) errors.description = "Description is required.";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}`,
  },
  errorHandler: {
    language: "js",
    code: `export function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: statusCode === 500 ? "Something went wrong" : error.message,
    requestId: req.id,
  });
}`,
  },
  pagination: {
    language: "js",
    code: `const page = Math.max(Number(req.query.page) || 1, 1);
const limit = Math.min(Number(req.query.limit) || 12, 50);
const skip = (page - 1) * limit;

const [items, total] = await Promise.all([
  Product.find(filter).sort(sort).skip(skip).limit(limit).lean(),
  Product.countDocuments(filter),
]);`,
  },
  upload: {
    language: "js",
    code: `const uploadResult = await cloudinary.uploader.upload(file.path, {
  folder: "products",
  resource_type: "image",
});

await Product.findByIdAndUpdate(productId, {
  imageUrl: uploadResult.secure_url,
  imagePublicId: uploadResult.public_id,
});`,
  },
  envConfig: {
    language: "js",
    code: `export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};

for (const [key, value] of Object.entries(config)) {
  if (!value) throw new Error(key + " is missing");
}`,
  },
  mongooseSchema: {
    language: "js",
    code: `const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);`,
  },
  mongoIndex: {
    language: "js",
    code: `productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ category: 1, isPublished: 1, createdAt: -1 });
productSchema.index({ name: "text", description: "text" });`,
  },
  aggregation: {
    language: "js",
    code: `const totals = await Order.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$restaurantId", revenue: { $sum: "$total" } } },
  { $sort: { revenue: -1 } },
  { $limit: 10 },
]);`,
  },
  leanQuery: {
    language: "js",
    code: `const projects = await Project.find({ isPublished: true })
  .select("title slug image category")
  .sort({ createdAt: -1 })
  .lean();`,
  },
  atlasConnect: {
    language: "js",
    code: `mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error", error.message);
});`,
  },
  reduxThunk: {
    language: "js",
    code: `export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unable to load orders");
    }
  }
);`,
  },
  selector: {
    language: "js",
    code: `export const selectVisibleOrders = createSelector(
  [selectOrders, selectOrderFilters],
  (orders, filters) =>
    orders.filter((order) => {
      return filters.status === "all" || order.status === filters.status;
    })
);`,
  },
  persistedState: {
    language: "js",
    code: `const initialState = {
  token: null,
  user: null,
  hydrated: false,
};

function hydrateAuth(state, action) {
  state.token = action.payload.token;
  state.user = action.payload.user;
  state.hydrated = true;
}`,
  },
  gitWorkflow: {
    language: "bash",
    code: `git switch -c feature/blog-filters
git status
git add src/components/blog
git commit -m "Add blog category filters"
git push origin feature/blog-filters`,
  },
  prCommands: {
    language: "bash",
    code: `git fetch origin
git switch feature/blog-filters
git rebase origin/main
git push --force-with-lease`,
  },
  mergeCommands: {
    language: "bash",
    code: `git status
git diff -- src/components/Header.jsx
git add src/components/Header.jsx
git rebase --continue`,
  },
  resetRevert: {
    language: "bash",
    code: `git stash push -m "wip contact form"
git revert abc1234
git reset --soft HEAD~1`,
  },
  githubActions: {
    language: "yaml",
    code: `name: CI

on:
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build`,
  },
  deployVercel: {
    language: "bash",
    code: `npm run build
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod`,
  },
  pm2: {
    language: "bash",
    code: `npm run build
pm2 start npm --name portfolio-api -- start
pm2 save
pm2 logs portfolio-api`,
  },
  cors: {
    language: "js",
    code: `const allowedOrigins = [
  "https://muskunishitha.vercel.app",
  "https://admin.example.com",
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));`,
  },
};

const posts = [
  {
    slug: "javascript-event-loop-ui-debugging",
    title: "Debugging Async UI Bugs With the JavaScript Event Loop",
    description: "How I reason about timers, promises, stale responses, and UI updates when JavaScript async behavior causes confusing frontend bugs.",
    date: "2026-08-23",
    category: "JavaScript",
    tags: ["JavaScript", "Async", "Debugging", "Frontend"],
    keywords: ["JavaScript event loop", "async UI debugging", "frontend JavaScript"],
    codeKey: "jsAsync",
    format: "debug",
    accent: "#FACC15",
    imageAlt: "JavaScript event loop illustration with queued tasks and UI panels",
    lead: "Async bugs usually look random at first. A search result appears after the user cleared the input, a loading spinner never stops, or an older request overwrites a newer one.",
    focus: "I start by separating the browser work into three groups: the user event that started the change, the async work that continues later, and the render that finally updates the screen. Once those are separated, the bug is easier to reproduce instead of being treated as a timing mystery.",
    pattern: "For API-driven screens, I like to give each request an identity or use an abort controller. That keeps stale responses from updating current state, especially in search, filters, dashboards, and mobile-style flows where the user can move quickly.",
    mistakes: ["Updating state after a component has unmounted.", "Assuming responses always arrive in the order they were sent.", "Mixing debounce timers and fetch calls without cleanup.", "Catching every error but never showing a useful retry state."],
    production: "In production I log request timing and failure type, but I avoid logging full payloads. That gives enough detail to diagnose slow endpoints without exposing customer data.",
    takeaway: "The event loop is not something to memorize for interviews only. It is a practical debugging tool when a React or Next.js screen behaves differently under real network speed.",
    related: ["api-integration-patterns-react", "react-hooks-mistakes-useeffect", "react-performance-optimization"],
  },
  {
    slug: "javascript-array-methods-api-data",
    title: "Using JavaScript Array Methods For Cleaner API Data",
    description: "Practical ways to use map, filter, reduce, sort, and find when shaping API responses for React and Next.js interfaces.",
    date: "2026-08-22",
    category: "JavaScript",
    tags: ["JavaScript", "API Integration", "Frontend", "Data Handling"],
    keywords: ["JavaScript array methods", "API data transformation", "React data mapping"],
    codeKey: "jsTransform",
    format: "guide",
    accent: "#F59E0B",
    imageAlt: "JavaScript data transformation illustration with arrays flowing into UI cards",
    lead: "Most frontend screens spend a surprising amount of time reshaping data. The API returns one structure, while the UI needs labels, grouped cards, filtered rows, and empty states.",
    focus: "I try to keep this transformation in one visible place instead of scattering small conditions across JSX. It makes the render easier to read and gives the next developer a clear place to adjust business rules.",
    pattern: "The pattern is simple: normalize once, derive the visible list, then render from that list. For dashboards and commerce pages, this keeps sorting, filtering, and display formatting predictable.",
    mistakes: ["Mutating the original API array before it reaches other components.", "Doing expensive sorting inside every card render.", "Using array index as a React key after filtering.", "Forgetting that reduce can make simple code harder when map or filter is enough."],
    production: "When a list grows, I move repeated formatting into helpers and memoize derived arrays when the source data is stable. The goal is readable code first, then measured optimization.",
    takeaway: "Good array method usage makes React code feel calmer. The JSX describes the UI, while the data preparation explains the rules.",
    related: ["api-integration-patterns-react", "react-state-management-decisions", "mongodb-lean-projections-performance"],
  },
  {
    slug: "javascript-error-handling-frontend-apis",
    title: "JavaScript Error Handling For Frontend API Calls",
    description: "A practical approach to handling failed API requests, network errors, validation messages, and retry states in JavaScript applications.",
    date: "2026-08-21",
    category: "JavaScript",
    tags: ["JavaScript", "REST API", "Error Handling", "Frontend"],
    keywords: ["JavaScript error handling", "frontend API errors", "fetch error handling"],
    codeKey: "reactFetch",
    format: "debug",
    accent: "#38BDF8",
    imageAlt: "Frontend API error handling illustration with request states",
    lead: "A failed API call should not make the whole interface feel broken. Users need to know whether the app is loading, empty, blocked by validation, or temporarily unable to reach the server.",
    focus: "I separate network failures from application failures. A 400 validation response should land near the form field. A 401 should usually move the user toward login. A 500 should show a short retry path and give the team enough logging to investigate.",
    pattern: "For React screens, I keep request state explicit with values like idle, loading, success, and error. That avoids boolean combinations such as isLoading plus hasError plus data length, which become difficult to reason about.",
    mistakes: ["Showing the same message for validation errors and server failures.", "Leaving stale successful data on screen after a failed refresh without any hint.", "Retrying automatically without a limit.", "Logging raw tokens or personal form data while debugging."],
    production: "Production error handling should be boring and consistent. The response shape, UI copy, and logs should all help a developer answer what failed and what the user can do next.",
    takeaway: "Error handling is part of the user experience. A clear failed state often earns more trust than a spinner that never ends.",
    related: ["express-error-handling-production", "api-security-checklist-mern", "react-form-handling-validation-errors"],
  },
  {
    slug: "semantic-html-for-developer-portfolios",
    title: "Semantic HTML That Helps Portfolio SEO And Accessibility",
    description: "How headings, landmarks, links, alt text, and readable document structure improve a developer portfolio for users and search engines.",
    date: "2026-08-20",
    category: "Frontend",
    tags: ["HTML", "SEO", "Accessibility", "Frontend"],
    keywords: ["semantic HTML portfolio", "portfolio SEO", "accessible HTML"],
    codeKey: "accessibility",
    format: "checklist",
    accent: "#22C55E",
    imageAlt: "Semantic HTML portfolio page illustration with landmarks and content sections",
    lead: "Portfolio SEO is not only metadata. Search engines and assistive technologies both benefit when the page structure says what each section actually is.",
    focus: "I use one clear page heading, section headings that follow a real hierarchy, descriptive links, and form labels that are connected to inputs. This makes the site easier to scan and easier to crawl.",
    pattern: "A portfolio page usually has obvious landmarks: header, main, sections for projects and skills, and footer. The markup should express those landmarks instead of relying on divs for everything.",
    mistakes: ["Skipping heading levels because a smaller style is needed.", "Using vague link text such as click here for project links.", "Adding alt text that repeats the filename instead of describing the image.", "Building forms with placeholder text but no label."],
    production: "Before shipping, I navigate the page with the keyboard, inspect headings, and check that social links and project cards make sense when read out of visual context.",
    takeaway: "Semantic HTML is a quiet quality signal. It improves SEO, accessibility, and maintainability without changing the visual design.",
    related: ["nextjs-metadata-seo-canonical", "accessible-react-interfaces-checklist", "building-responsive-websites-react"],
  },
  {
    slug: "css-grid-flexbox-dashboard-layouts",
    title: "CSS Grid And Flexbox Patterns For Dashboard Layouts",
    description: "How I choose between Grid and Flexbox for responsive dashboard cards, sidebars, charts, and content-heavy application screens.",
    date: "2026-08-19",
    category: "Frontend",
    tags: ["CSS", "Responsive Design", "Dashboard", "Frontend"],
    keywords: ["CSS Grid dashboard", "Flexbox layout", "responsive dashboard CSS"],
    codeKey: "tailwind",
    format: "guide",
    accent: "#06B6D4",
    imageAlt: "Responsive dashboard layout illustration with grid columns and cards",
    lead: "Dashboard layouts become messy when every section has a custom width and breakpoint. I get better results when the layout rules are simple and the content owns less of the page geometry.",
    focus: "I use Grid when the page needs rows and columns to line up. I use Flexbox when a single direction matters, such as toolbar actions, badges, input groups, or card footers.",
    pattern: "For responsive dashboards, I define stable tracks and let cards fill available space. Charts and image areas get aspect ratios so loading data does not resize the whole screen.",
    mistakes: ["Using fixed pixel widths for columns that must survive tablet sizes.", "Letting chart legends change card height on every filter change.", "Adding breakpoints for one screen instead of fixing the layout rule.", "Making a sidebar position sticky before checking small screen behavior."],
    production: "I test dashboards with empty data, long labels, and the largest expected numbers. Layout issues often hide until real business content arrives.",
    takeaway: "Grid and Flexbox are strongest when they are used for their natural jobs. The page feels more stable, and the React components stay simpler.",
    related: ["building-responsive-websites-react", "frontend-performance-budget-next-react", "reducing-layout-shift-images"],
  },
  {
    slug: "tailwind-css-component-patterns",
    title: "Tailwind CSS Patterns For Reusable React Components",
    description: "How to keep Tailwind CSS readable in React components by using variants, stable spacing rules, and small shared UI primitives.",
    date: "2026-08-17",
    category: "Frontend",
    tags: ["Tailwind CSS", "React.js", "Component Architecture", "Frontend"],
    keywords: ["Tailwind CSS React components", "Tailwind component patterns", "reusable UI"],
    codeKey: "tailwind",
    format: "architecture",
    accent: "#14B8A6",
    imageAlt: "Tailwind CSS component system illustration with reusable UI blocks",
    lead: "Tailwind becomes hard to read when every component grows into a wall of classes. The fix is not to abandon utility classes; it is to create better boundaries.",
    focus: "I keep one-off layout classes near the page and reusable behavior inside components. Buttons, inputs, cards, badges, and empty states deserve stable variants because they appear everywhere.",
    pattern: "A small variant map is often enough. It avoids class duplication without introducing a design system that is bigger than the project.",
    mistakes: ["Creating a custom component before the pattern has repeated.", "Mixing page spacing and component spacing in the same class list.", "Changing button height per screen and causing layout shifts.", "Using arbitrary values everywhere instead of agreeing on a spacing rhythm."],
    production: "For portfolio and dashboard work, consistent primitives make future edits much safer. A new project card or contact form can match the site without copying a previous screen line by line.",
    takeaway: "Tailwind works best when the codebase has a small vocabulary of components and a clear rule for where layout decisions live.",
    related: ["scalable-react-component-architecture", "building-responsive-websites-react", "css-grid-flexbox-dashboard-layouts"],
  },
  {
    slug: "bootstrap-react-layout-cleanup",
    title: "Working With Bootstrap Layouts In React Projects",
    description: "A practical way to handle Bootstrap grids, spacing, and components in React without fighting the existing layout system.",
    date: "2026-08-16",
    category: "Frontend",
    tags: ["Bootstrap", "React.js", "CSS", "Frontend"],
    keywords: ["Bootstrap React layout", "Bootstrap grid React", "frontend layout cleanup"],
    codeKey: "bootstrapLayout",
    format: "checklist",
    accent: "#8B5CF6",
    imageAlt: "Bootstrap grid layout illustration with responsive rows and columns",
    lead: "Bootstrap still appears in many React projects, especially admin panels and older product screens. The main job is to work with its grid instead of layering random custom CSS over it.",
    focus: "I first identify which parts are Bootstrap structure and which parts are product-specific UI. Container, row, column, and gap utilities should handle layout; component CSS should handle the product card or form.",
    pattern: "When a screen is already Bootstrap-based, I keep the grid predictable and wrap custom React components inside the columns. That prevents the component from needing to know every breakpoint.",
    mistakes: ["Putting fixed widths inside Bootstrap columns.", "Mixing grid classes with unrelated absolute positioning.", "Changing Bootstrap spacing globally for one screen.", "Forgetting that modals and dropdowns need keyboard and focus behavior checked."],
    production: "If the long-term direction is Tailwind or custom CSS, I migrate screen by screen. A half-migrated layout is where most spacing bugs come from.",
    takeaway: "Bootstrap can be perfectly serviceable when the team treats it as a layout system, not as a pile of classes to override.",
    related: ["tailwind-css-component-patterns", "css-grid-flexbox-dashboard-layouts", "accessible-react-interfaces-checklist"],
  },
  {
    slug: "material-ui-react-form-patterns",
    title: "Material UI Form Patterns That Stay Maintainable",
    description: "How to structure Material UI form fields, helper text, validation states, and reusable wrappers in React applications.",
    date: "2026-08-15",
    category: "Frontend",
    tags: ["Material UI", "React.js", "Forms", "Frontend"],
    keywords: ["Material UI forms", "React form validation", "MUI TextField"],
    codeKey: "muiForm",
    format: "guide",
    accent: "#3B82F6",
    imageAlt: "Material UI form illustration with fields, validation, and helper text",
    lead: "Component libraries save time, but they do not remove form design decisions. A Material UI form still needs clear validation, accessible labels, and predictable error behavior.",
    focus: "The mistake I see most often is treating each field as a special case. I prefer a small wrapper around repeated behavior: value, onChange, error, helper text, and disabled state.",
    pattern: "When every field receives errors in the same shape, API validation messages can be displayed beside the correct input. That matters more than making the form visually fancy.",
    mistakes: ["Using helper text for instructions and then replacing it with an unrelated error.", "Letting dialog forms submit twice while the button remains enabled.", "Overriding theme styles inside every field.", "Forgetting mobile keyboard types for email, phone, and number inputs."],
    production: "Form libraries and UI libraries should agree on ownership. One should manage state and validation, while the other renders the field cleanly.",
    takeaway: "Material UI works well when the form has a consistent error contract. The library gives components, but the app still needs rules.",
    related: ["react-form-handling-validation-errors", "accessible-react-interfaces-checklist", "validating-express-api-inputs"],
  },
  {
    slug: "accessible-react-interfaces-checklist",
    title: "A Practical Accessibility Checklist For React Interfaces",
    description: "The accessibility checks I use for React pages, forms, buttons, modals, keyboard navigation, focus, and dynamic UI states.",
    date: "2026-08-14",
    category: "Frontend",
    tags: ["Accessibility", "React.js", "HTML", "Frontend"],
    keywords: ["React accessibility checklist", "accessible React forms", "keyboard navigation"],
    codeKey: "accessibility",
    format: "checklist",
    accent: "#84CC16",
    imageAlt: "Accessible React interface illustration with keyboard focus and labels",
    lead: "Accessibility is easiest when it is checked while building, not after the UI is finished. Most fixes are small when they are caught early.",
    focus: "I check keyboard navigation first because it reveals many hidden problems: missing focus states, buttons built as divs, modals that do not trap focus, and menus that cannot be closed predictably.",
    pattern: "For forms, every input gets a label, every error has a clear relationship to the field, and the submit button communicates loading state without trapping the user.",
    mistakes: ["Removing outlines globally instead of styling focus states.", "Using icons without accessible names on action buttons.", "Announcing every small state change with role alert.", "Relying only on color to communicate errors or selected states."],
    production: "I also test with real content lengths. A button that is accessible with a short label can become unusable when translated or when the CMS content is longer.",
    takeaway: "Accessible React is mostly disciplined HTML plus thoughtful state handling. It helps everyone use the interface with less friction.",
    related: ["semantic-html-for-developer-portfolios", "react-form-handling-validation-errors", "mobile-form-ux-react-native"],
  },
  {
    slug: "api-integration-patterns-react",
    title: "API Integration Patterns For React Dashboards",
    description: "How I structure loading states, retries, filters, pagination, and response mapping when React screens depend on REST APIs.",
    date: "2026-08-13",
    category: "React",
    tags: ["React.js", "REST API", "Frontend", "Dashboard"],
    keywords: ["React API integration", "React dashboard API", "REST API frontend"],
    codeKey: "reactFetch",
    format: "architecture",
    accent: "#60A5FA",
    imageAlt: "React dashboard API integration illustration with request and response panels",
    lead: "API integration is where many React screens become difficult to maintain. The UI starts simple, then filters, pagination, refresh, auth errors, and empty states arrive.",
    focus: "I keep API code behind a small client or hook so the component does not need to know headers, base URLs, response parsing, and retry rules. The component should mostly decide what to render for each state.",
    pattern: "A useful API hook returns data, status, error, refetch, and sometimes pagination metadata. That is enough for the screen to stay honest without hiding important behavior.",
    mistakes: ["Calling the API directly from every button and duplicating error handling.", "Treating an empty array as a loading state.", "Ignoring cancelled requests when filters change quickly.", "Letting backend response shapes leak into every component."],
    production: "For production dashboards, I check slow network mode and token expiry. Those two tests reveal more integration bugs than happy-path clicking.",
    takeaway: "A React API integration should make failure states boring. When the contract is clear, the UI feels reliable even when the network is not.",
    related: ["javascript-error-handling-frontend-apis", "rest-api-pagination-filtering-sorting", "redux-toolkit-async-thunks-api-state"],
  },
  {
    slug: "scalable-react-component-architecture",
    title: "Scalable React Component Architecture For Real Features",
    description: "How I split React screens into page, feature, UI, hook, and helper layers without creating unnecessary abstraction.",
    date: "2026-08-12",
    category: "React",
    tags: ["React.js", "Component Architecture", "Frontend", "Best Practices"],
    keywords: ["React component architecture", "scalable React components", "React feature structure"],
    codeKey: "reactComponent",
    format: "architecture",
    accent: "#61DAFB",
    imageAlt: "React component architecture illustration with nested feature modules",
    lead: "React architecture is not about folders first. It starts with knowing which parts of a feature change together and which parts should be reusable.",
    focus: "For product screens, I usually separate route-level layout, feature components, shared UI components, hooks, and formatting helpers. That is enough structure for most portfolio, e-commerce, and dashboard work.",
    pattern: "A card component should not fetch its own data unless it is truly independent. A page should not know the internal markup of every card. The boundary between them is the feature contract.",
    mistakes: ["Creating a global components folder where unrelated feature logic collects.", "Passing entire API objects into deeply nested UI components.", "Making every component reusable before a second use case exists.", "Putting all state at the top of the app because it feels organized."],
    production: "A scalable component tree makes bugs easier to fix. When an order card breaks, I want to know whether the issue is data loading, formatting, or rendering within a few minutes.",
    takeaway: "Good React architecture is practical. It creates enough boundaries to move quickly without making simple screens feel ceremonial.",
    related: ["react-performance-optimization", "tailwind-css-component-patterns", "react-state-management-decisions"],
  },
  {
    slug: "react-form-handling-validation-errors",
    title: "React Form Handling With Validation And API Errors",
    description: "A practical form handling flow for React apps, including field state, submit state, backend validation, and clear user feedback.",
    date: "2026-08-11",
    category: "React",
    tags: ["React.js", "Forms", "Validation", "API Integration"],
    keywords: ["React form handling", "React validation errors", "API form errors"],
    codeKey: "reactForm",
    format: "guide",
    accent: "#F472B6",
    imageAlt: "React form validation illustration with input fields and API response states",
    lead: "Forms fail in more ways than empty required fields. The API can reject a value, the network can fail, a user can double submit, and a success message can disappear too quickly.",
    focus: "I separate client validation from API validation. Client validation catches obvious issues early, while API validation remains the final source of truth for uniqueness, permissions, and business rules.",
    pattern: "A form component should know the current field values, touched fields, submit status, and server errors. When those states are explicit, the UI can show the right message in the right place.",
    mistakes: ["Clearing all fields before the API confirms success.", "Showing backend errors only as a toast when the problem belongs to a field.", "Leaving the submit button enabled during an active request.", "Using placeholders as labels and making the form harder to scan."],
    production: "In production I also think about analytics and support. If many users hit the same validation error, the form copy or field design may be the real problem.",
    takeaway: "A good React form feels calm because every state has a place: editing, validating, submitting, failed, and successful.",
    related: ["material-ui-react-form-patterns", "validating-express-api-inputs", "accessible-react-interfaces-checklist"],
  },
  {
    slug: "react-hooks-mistakes-useeffect",
    title: "Common useEffect Mistakes In React Applications",
    description: "How to avoid stale data, repeated API calls, missing cleanup, and confusing dependency arrays when using React useEffect.",
    date: "2026-08-09",
    category: "React",
    tags: ["React.js", "Hooks", "useEffect", "Debugging"],
    keywords: ["useEffect mistakes", "React hooks debugging", "React effect cleanup"],
    codeKey: "reactEffect",
    format: "debug",
    accent: "#A78BFA",
    imageAlt: "React useEffect debugging illustration with dependencies and cleanup",
    lead: "The hardest useEffect bugs are not syntax problems. They are ownership problems: the effect is doing work that belongs in an event handler, a data hook, or a derived value.",
    focus: "Before changing a dependency array, I ask what the effect is synchronizing with. If it is synchronizing with the URL, a subscription, or an external API, an effect makes sense. If it is calculating display data, it probably belongs in render or useMemo.",
    pattern: "Cleanup matters for timers, subscriptions, requests, and async callbacks. Without cleanup, old work can update new screens and create bugs that only appear when users move quickly.",
    mistakes: ["Suppressing dependency warnings without understanding the stale value.", "Fetching data in multiple child components for the same screen.", "Using useEffect to copy props into state by default.", "Starting intervals without clearing them when the component unmounts."],
    production: "I test effects by changing filters quickly, navigating away during loading, and switching accounts. Those flows expose stale updates better than a slow happy path.",
    takeaway: "useEffect is powerful when it synchronizes with something outside React. It becomes noisy when it is used as a general place to put logic.",
    related: ["javascript-event-loop-ui-debugging", "api-integration-patterns-react", "react-performance-optimization"],
  },
  {
    slug: "react-error-boundaries-empty-states",
    title: "React Error Boundaries And Empty States Users Can Trust",
    description: "How I design React error boundaries, fallback UI, empty states, and retry paths for resilient application screens.",
    date: "2026-08-08",
    category: "React",
    tags: ["React.js", "Error Handling", "UX", "Frontend"],
    keywords: ["React error boundaries", "React empty states", "fallback UI"],
    codeKey: "reactBoundary",
    format: "checklist",
    accent: "#FB7185",
    imageAlt: "React fallback UI illustration with error and empty state panels",
    lead: "A resilient React app does not pretend failures never happen. It gives users a clear path when a section is empty, unavailable, or blocked by an error.",
    focus: "I treat empty states and error states separately. Empty means the request worked but there is nothing to show. Error means something prevented the app from getting or rendering the data.",
    pattern: "For feature-level errors, a local fallback is usually better than blanking the full app. A dashboard chart can fail while the rest of the page remains useful.",
    mistakes: ["Using a generic something went wrong message for every failure.", "Hiding the retry button inside a toast that disappears.", "Treating zero results as an error.", "Letting one broken optional widget crash the whole route."],
    production: "Error boundaries should log enough context to find the failing feature, but the user-facing message should stay short and calm.",
    takeaway: "Fallback UI is product work. It protects the user journey when real data, real networks, and real edge cases arrive.",
    related: ["javascript-error-handling-frontend-apis", "express-error-handling-production", "api-integration-patterns-react"],
  },
  {
    slug: "react-state-management-decisions",
    title: "How I Choose State Management In React Projects",
    description: "A practical decision guide for local state, context, Redux Toolkit, server state, and persisted state in React applications.",
    date: "2026-08-07",
    category: "State Management",
    tags: ["React.js", "State Management", "Redux Toolkit", "Frontend"],
    keywords: ["React state management", "Redux Toolkit decision", "local state vs global state"],
    codeKey: "selector",
    format: "architecture",
    accent: "#7C3AED",
    imageAlt: "React state management illustration with local, shared, and server state layers",
    lead: "State management gets easier when every piece of state has a home. The wrong home is what makes simple features feel heavy.",
    focus: "Local UI state stays local. Shared application state can move to context or Redux Toolkit. Server data should keep its loading and error behavior close to the API boundary.",
    pattern: "I reach for Redux Toolkit when state is shared, important, and updated from several places. Auth, dashboard filters, carts, and cross-screen preferences are good examples.",
    mistakes: ["Putting every input value into Redux.", "Using context for fast-changing values that re-render a large tree.", "Persisting state without planning logout and token expiry.", "Duplicating the same data in local state and global state."],
    production: "In production, state bugs often show up after refresh, logout, or switching users. I test those flows before trusting the architecture.",
    takeaway: "The best state solution is not the biggest one. It is the one that matches how the feature changes over time.",
    related: ["redux-toolkit-react-applications", "redux-selectors-store-architecture", "persisted-auth-state-redux-toolkit"],
  },
  {
    slug: "frontend-performance-budget-next-react",
    title: "A Frontend Performance Budget For React And Next.js Sites",
    description: "How I set practical performance limits for JavaScript, images, fonts, animation, and client components in content-heavy websites.",
    date: "2026-08-06",
    category: "Performance",
    tags: ["Performance", "React.js", "Next.js", "Frontend"],
    keywords: ["frontend performance budget", "React performance checklist", "Next.js performance"],
    codeKey: "nextImage",
    format: "checklist",
    accent: "#0EA5E9",
    imageAlt: "Frontend performance budget illustration with metrics and asset sizes",
    lead: "Performance improves faster when the team has limits before the page becomes slow. A budget turns vague goals like make it fast into specific decisions.",
    focus: "For portfolio and content sites, I watch JavaScript shipped to the browser, image weight, font loading, and layout shifts. The page should not pay dashboard-level JavaScript cost for static content.",
    pattern: "In Next.js, I keep static content in server components where possible and make interactive islands deliberate. Search boxes, filters, and animated controls can be client components without making the entire page client-rendered.",
    mistakes: ["Marking a large page with use client because one small section needs state.", "Loading high-resolution images into small cards.", "Preloading every asset instead of only above-the-fold essentials.", "Animating layout properties that force repeated reflow."],
    production: "I verify performance with production builds, not only the dev server. Development mode is useful for coding, but it does not represent the final bundle.",
    takeaway: "A performance budget protects future changes. It helps a site stay fast as more posts, projects, and images are added.",
    related: ["react-performance-optimization", "nextjs-image-optimization-practical", "reducing-layout-shift-images"],
  },
  {
    slug: "reducing-layout-shift-images",
    title: "Reducing Layout Shift With Stable Images And Cards",
    description: "How image dimensions, aspect ratios, skeleton states, and predictable card heights help React interfaces avoid layout shift.",
    date: "2026-08-05",
    category: "Performance",
    tags: ["Performance", "Images", "CSS", "Frontend"],
    keywords: ["reduce layout shift", "image aspect ratio", "React card layout"],
    codeKey: "nextImage",
    format: "guide",
    accent: "#F97316",
    imageAlt: "Stable image card layout illustration showing reserved space and aspect ratios",
    lead: "Layout shift makes a site feel unfinished. The user reaches for a button, an image loads, and the button moves.",
    focus: "I prevent this by reserving space before content arrives. Image wrappers get an aspect ratio, cards have stable structure, and loading states approximate the final layout.",
    pattern: "Next.js Image works best when its parent has known dimensions. A fill image inside an aspect-ratio wrapper gives the browser a stable box to reserve.",
    mistakes: ["Using image tags without width, height, or a stable wrapper.", "Letting dynamic labels change card height in a grid.", "Loading custom fonts without considering fallback size differences.", "Showing skeletons that are much smaller than the real content."],
    production: "I test layout with slow image loading and long titles. The fastest way to catch shift is to make the page wait for assets.",
    takeaway: "Stable layout is a performance feature and a design feature. It makes the interface feel intentional even while data is loading.",
    related: ["frontend-performance-budget-next-react", "nextjs-image-optimization-practical", "css-grid-flexbox-dashboard-layouts"],
  },
  {
    slug: "nextjs-app-router-project-structure",
    title: "Next.js App Router Project Structure That Scales",
    description: "How I organize routes, layouts, server components, client components, metadata, and shared code in Next.js App Router projects.",
    date: "2026-08-04",
    category: "Next.js",
    tags: ["Next.js", "App Router", "Architecture", "React.js"],
    keywords: ["Next.js App Router structure", "Next.js project architecture", "App Router folders"],
    codeKey: "nextDynamic",
    format: "architecture",
    accent: "#111827",
    imageAlt: "Next.js App Router folder structure illustration with routes and layouts",
    lead: "The App Router is easiest to maintain when route files stay focused. A page should show what the route does, not contain every UI detail for the feature.",
    focus: "I keep route files responsible for metadata, server data loading, redirects, and selecting the main component. The visual UI lives in components where it can be tested and reused.",
    pattern: "A good App Router structure separates app routes, shared components, content loaders, and API utilities. That keeps the route tree readable as projects, blog posts, and contact forms grow.",
    mistakes: ["Putting all business logic directly inside page files.", "Making a whole route client-side because one child needs state.", "Duplicating metadata objects across pages.", "Mixing content parsing utilities into visual components."],
    production: "Production builds are the real test for App Router structure. Static params, metadata, and server-only code need to resolve cleanly without relying on browser APIs.",
    takeaway: "A scalable App Router project feels boring to navigate. You can open a folder and quickly see what belongs to the route.",
    related: ["nextjs-server-client-component-boundaries", "nextjs-dynamic-routes-blog-slugs", "nextjs-modern-web-development"],
  },
  {
    slug: "nextjs-server-client-component-boundaries",
    title: "Server Components And Client Components In Next.js",
    description: "A practical guide to deciding what should stay server-rendered and what should become a client component in Next.js apps.",
    date: "2026-08-03",
    category: "Next.js",
    tags: ["Next.js", "Server Components", "Client Components", "Performance"],
    keywords: ["Next.js Server Components", "Next.js Client Components", "use client boundary"],
    codeKey: "nextDynamic",
    format: "guide",
    accent: "#10B981",
    imageAlt: "Next.js server and client component boundary illustration",
    lead: "The use client line is small, but it changes how much JavaScript the browser receives. That decision deserves a little attention.",
    focus: "I keep static content, filesystem reads, metadata work, and database calls on the server. I move only the parts that need browser state, effects, event handlers, or local storage into client components.",
    pattern: "A common pattern is a server page that prepares summaries and passes them into a focused client component for search or filters. The client gets the data it needs but not the full article content or server utilities.",
    mistakes: ["Adding use client to a page because an icon button inside it needs onClick.", "Passing server-only functions into client components.", "Reading localStorage in a server component.", "Sending large raw content to the browser for a listing page."],
    production: "The build output and bundle analyzer are useful when a page unexpectedly becomes heavy. Boundaries are performance decisions, not just syntax decisions.",
    takeaway: "Server and client components work best when they have clear jobs. The server prepares; the client interacts.",
    related: ["frontend-performance-budget-next-react", "nextjs-app-router-project-structure", "nextjs-modern-web-development"],
  },
  {
    slug: "nextjs-dynamic-routes-blog-slugs",
    title: "Dynamic Routes For Blog Slugs In Next.js",
    description: "How dynamic routes, generateStaticParams, slug lookups, and not-found states work together for crawlable Next.js blog pages.",
    date: "2026-08-02",
    category: "Next.js",
    tags: ["Next.js", "Dynamic Routes", "Blog", "SEO"],
    keywords: ["Next.js dynamic routes", "blog slug Next.js", "generateStaticParams"],
    codeKey: "nextDynamic",
    format: "guide",
    accent: "#6366F1",
    imageAlt: "Next.js dynamic blog route illustration with slug paths",
    lead: "A blog route needs to be predictable for people and crawlable for search engines. The URL should describe the article and resolve without client-side tricks.",
    focus: "With the App Router, I use a folder like blog/[slug] and generate static params from the content source. That gives every post a real route at build time.",
    pattern: "The slug in frontmatter should remain stable after publishing. A title can be improved later, but changing the URL should be rare and should include redirects when needed.",
    mistakes: ["Building article pages only after client-side search.", "Changing slugs while keeping old links in the sitemap.", "Returning a generic page for missing posts instead of notFound.", "Generating metadata without checking that the post exists."],
    production: "For production SEO, I confirm that every slug appears in the sitemap and that canonical URLs match the actual route.",
    takeaway: "Dynamic routes are simple when content ownership is clear: one slug, one article, one canonical URL.",
    related: ["nextjs-metadata-seo-canonical", "semantic-html-for-developer-portfolios", "nextjs-app-router-project-structure"],
  },
  {
    slug: "nextjs-metadata-seo-canonical",
    title: "Next.js Metadata For SEO, Canonicals, Open Graph, And Twitter",
    description: "How I set per-page Next.js metadata for blog posts, portfolio pages, canonical URLs, Open Graph previews, and Twitter cards.",
    date: "2026-08-01",
    category: "Next.js",
    tags: ["Next.js", "SEO", "Metadata", "Open Graph"],
    keywords: ["Next.js metadata SEO", "canonical URL Next.js", "Open Graph Next.js"],
    codeKey: "nextMetadata",
    format: "checklist",
    accent: "#2563EB",
    imageAlt: "Next.js SEO metadata illustration with canonical and social preview cards",
    lead: "Metadata is part of the route, not an afterthought. A good blog post should explain itself to search results, link previews, and browser tabs.",
    focus: "For each article I want a clear title, description, canonical URL, Open Graph image, Twitter image, publish date, tags, and structured data. None of that should require hardcoding posts inside a component.",
    pattern: "A content loader can read frontmatter and a route-level generateMetadata function can turn that into Next.js metadata. This keeps SEO close to the page while content stays in MDX.",
    mistakes: ["Using the same description for every blog post.", "Pointing canonical URLs to the blog index instead of the article.", "Using images without dimensions or meaningful alt text.", "Forgetting that social previews use absolute URLs after deployment."],
    production: "Before shipping, I inspect generated metadata for several slugs, not only the first post. Dynamic routes can hide mistakes until an older article is opened.",
    takeaway: "Strong metadata is boring in code and useful everywhere else. It helps each post stand on its own.",
    related: ["nextjs-dynamic-routes-blog-slugs", "semantic-html-for-developer-portfolios", "deploying-nextjs-vercel-production"],
  },
  {
    slug: "nextjs-image-optimization-practical",
    title: "Practical Image Optimization In Next.js",
    description: "How to use Next.js Image with stable containers, sizes, priority, alt text, and local assets without hurting page speed.",
    date: "2026-07-31",
    category: "Next.js",
    tags: ["Next.js", "Images", "Performance", "Frontend"],
    keywords: ["Next.js image optimization", "next image sizes", "image performance"],
    codeKey: "nextImage",
    format: "guide",
    accent: "#0F766E",
    imageAlt: "Next.js image optimization illustration with responsive image containers",
    lead: "Images can make a polished site feel slow even when the React code is clean. The fix starts with choosing the right image size and reserving the right space.",
    focus: "I use priority only for above-the-fold images, define sizes to match the layout, and put fill images inside stable aspect-ratio wrappers.",
    pattern: "For blog cards and project cards, a consistent aspect ratio prevents layout shift and keeps the grid clean. The alt text should describe the visual purpose, not repeat the filename.",
    mistakes: ["Uploading huge images for small thumbnails.", "Setting priority on every image in a list.", "Using fill without a positioned parent and stable height.", "Cropping important product details out of cover images."],
    production: "I check mobile because image waste is easier to miss on a fast laptop. A card that looks fine on desktop can still download more than the phone needs.",
    takeaway: "Next.js Image is a tool, not a guarantee. It works best with thoughtful dimensions, real alt text, and a layout that stays stable.",
    related: ["reducing-layout-shift-images", "frontend-performance-budget-next-react", "nextjs-modern-web-development"],
  },
  {
    slug: "nextjs-api-routes-contact-forms",
    title: "Using Next.js API Routes For Portfolio Contact Forms",
    description: "A practical way to build contact form endpoints with validation, safe environment variables, response shapes, and email delivery.",
    date: "2026-07-30",
    category: "Next.js",
    tags: ["Next.js", "API Routes", "Forms", "Backend"],
    keywords: ["Next.js API routes", "portfolio contact form", "Next.js form endpoint"],
    codeKey: "nextApiRoute",
    format: "architecture",
    accent: "#0891B2",
    imageAlt: "Next.js contact form API route illustration with form submission flow",
    lead: "A portfolio contact form looks small, but it still needs backend discipline. Validation, spam protection, email errors, and environment variables all matter.",
    focus: "I keep the route handler focused on parsing, validation, sending, and returning a clean response. The UI should not need to understand mail provider errors.",
    pattern: "The endpoint should return field-level errors for bad input and a simple success response after the message is accepted. Sensitive values stay in server-only environment variables.",
    mistakes: ["Trusting client-side validation as the only validation.", "Returning raw provider errors to the browser.", "Putting private API keys in NEXT_PUBLIC variables.", "Letting the form submit repeatedly while the request is active."],
    production: "I test the contact form with missing fields, long messages, invalid email, and a temporarily failing mail service. That is where the endpoint proves it is ready.",
    takeaway: "Small API routes deserve the same clarity as larger backends. The user only sees a form, but the route protects the whole flow.",
    related: ["react-form-handling-validation-errors", "environment-variables-node-nextjs", "api-security-checklist-mern"],
  },
  {
    slug: "nextjs-production-build-debugging",
    title: "Debugging Next.js Production Build Errors",
    description: "How I approach Next.js build failures involving server code, browser APIs, environment variables, dynamic routes, and metadata.",
    date: "2026-07-29",
    category: "Next.js",
    tags: ["Next.js", "Deployment", "Debugging", "Production"],
    keywords: ["Next.js build errors", "production build debugging", "Next.js deployment issues"],
    codeKey: "deployVercel",
    format: "debug",
    accent: "#F43F5E",
    imageAlt: "Next.js production build debugging illustration with terminal and route checks",
    lead: "A Next.js app can work in dev and fail during build because production asks stricter questions. Static generation, server components, and metadata all run before a user opens the page.",
    focus: "I read the first real error carefully, then check whether the failing file is running on the server or in the browser. Many fixes come from moving browser-only code behind a client component or effect.",
    pattern: "For content routes, I verify that all files exist, slugs are unique, dates are valid, and metadata can be generated for every page.",
    mistakes: ["Using window or localStorage in server-rendered code.", "Depending on an environment variable that is only set locally.", "Generating invalid dates from frontmatter.", "Ignoring case-sensitive path differences that pass on one machine and fail in hosting."],
    production: "I always run a production build before deployment. The dev server is forgiving; the build is where deployment truth shows up.",
    takeaway: "Build errors are not interruptions. They are early warnings about what the hosting platform would reject later.",
    related: ["deploying-nextjs-vercel-production", "nextjs-app-router-project-structure", "environment-variables-node-nextjs"],
  },
  {
    slug: "react-native-navigation-flow-patterns",
    title: "React Native Navigation Flow Patterns For Real Apps",
    description: "How I plan React Native navigation stacks, tab flows, detail routes, auth gates, and back behavior for Android applications.",
    date: "2026-07-28",
    category: "React Native",
    tags: ["React Native", "React Navigation", "Android", "Mobile Development"],
    keywords: ["React Native navigation", "React Navigation patterns", "Android back behavior"],
    codeKey: "rnNavigation",
    format: "architecture",
    accent: "#61DAFB",
    imageAlt: "React Native navigation flow illustration with mobile screens and route arrows",
    lead: "Navigation is more than moving between screens. It defines how users recover, go back, complete tasks, and understand where they are in the app.",
    focus: "I map flows before writing screens: auth, tabs, detail pages, edit forms, and modal actions. That helps decide which screens belong in a stack and which belong in a tab.",
    pattern: "React Navigation works best when route params are small and stable. Passing an id is usually safer than passing a full object that may go stale.",
    mistakes: ["Passing large API objects through navigation params.", "Forgetting Android hardware back behavior in edit flows.", "Opening modal screens without a clear close path.", "Refetching every screen unnecessarily when returning from details."],
    production: "I test navigation by starting from a fresh install, logging in, deep-linking if supported, editing data, and pressing back through the full flow.",
    takeaway: "Good mobile navigation feels invisible because the route structure matches the way users think about the task.",
    related: ["react-native-android-app-development", "mobile-form-ux-react-native", "debugging-react-native-release-builds"],
  },
  {
    slug: "expo-vs-react-native-cli-practical-choice",
    title: "Expo Or React Native CLI: How I Think About The Choice",
    description: "A practical comparison of Expo and React Native CLI for app setup, native modules, build workflow, release needs, and team speed.",
    date: "2026-07-27",
    category: "Mobile Development",
    tags: ["React Native", "Expo", "Android", "Mobile Development"],
    keywords: ["Expo vs React Native CLI", "React Native app setup", "mobile build workflow"],
    codeKey: "rnReleaseConfig",
    format: "guide",
    accent: "#111827",
    imageAlt: "Expo and React Native CLI comparison illustration with mobile build paths",
    lead: "The Expo vs React Native CLI decision should follow the app's native needs, not personal habit. Both can be good choices when the constraints are clear.",
    focus: "Expo is strong when speed, managed tooling, and standard device features cover the product. React Native CLI gives more direct native control when the app needs custom Android modules or deeper Gradle configuration.",
    pattern: "I look at push notifications, maps, native SDKs, background behavior, release process, and expected maintenance. A simple product app and a hardware-integrated app do not need the same setup.",
    mistakes: ["Choosing CLI because it sounds more advanced.", "Choosing Expo without checking required native SDK support.", "Ignoring who will maintain Android build issues later.", "Waiting until release week to test the production build path."],
    production: "The right choice is the one the team can build, debug, and release confidently. Tooling speed matters, but release confidence matters more.",
    takeaway: "Expo and React Native CLI are paths to the same goal: a reliable mobile app. The product requirements should pick the path.",
    related: ["apk-aab-react-native-build-workflow", "react-native-native-modules-when-needed", "react-native-android-deployment"],
  },
  {
    slug: "android-permissions-react-native",
    title: "Handling Android Permissions In React Native Apps",
    description: "How I request, explain, retry, and recover from Android permissions for notifications, location, camera, storage, and app settings.",
    date: "2026-07-26",
    category: "React Native",
    tags: ["React Native", "Android", "Permissions", "Mobile Development"],
    keywords: ["React Native Android permissions", "mobile permission UX", "Android permission handling"],
    codeKey: "rnPermissions",
    format: "checklist",
    accent: "#22C55E",
    imageAlt: "Android permission handling illustration with mobile permission dialog and settings path",
    lead: "Permission handling is UX, not only native configuration. A user should understand why the app asks and what still works if they say no.",
    focus: "I ask for permission near the moment of value. Requesting location on the first screen rarely feels as reasonable as requesting it when the user starts delivery tracking.",
    pattern: "The UI needs states for granted, denied, blocked, unavailable, and not requested. A blocked permission should explain how to open settings instead of looping the same prompt.",
    mistakes: ["Requesting permissions before explaining the feature.", "Treating denial as a crash path.", "Assuming Android versions behave the same.", "Forgetting to test release builds where permissions and manifests matter."],
    production: "I test permissions on a clean install, after denial, after selecting do not ask again, and after changing the setting manually.",
    takeaway: "Good permission handling respects the user's choice and keeps the app useful whenever possible.",
    related: ["firebase-cloud-messaging-react-native-push", "react-native-android-app-development", "debugging-react-native-release-builds"],
  },
  {
    slug: "firebase-cloud-messaging-react-native-push",
    title: "Firebase Cloud Messaging For React Native Push Notifications",
    description: "A practical push notification flow for React Native apps using Firebase Cloud Messaging, device tokens, permissions, and foreground handling.",
    date: "2026-07-25",
    category: "React Native",
    tags: ["React Native", "Firebase", "Push Notifications", "Android"],
    keywords: ["Firebase Cloud Messaging React Native", "React Native push notifications", "FCM Android"],
    codeKey: "rnPush",
    format: "architecture",
    accent: "#F59E0B",
    imageAlt: "Firebase Cloud Messaging push notification illustration with mobile devices",
    lead: "Push notifications touch frontend, backend, Android setup, and user trust. The feature is small on the screen but wide in implementation.",
    focus: "I split the work into permission request, token registration, backend storage, message sending, and foreground or background handling. Each step gets its own failure state.",
    pattern: "The backend should store the latest device token against the right user or device record. The app should refresh the token when Firebase rotates it.",
    mistakes: ["Sending notifications before the user has opted in.", "Not handling foreground messages because they worked in the background.", "Keeping old device tokens forever.", "Testing only debug mode and missing release configuration issues."],
    production: "Notification copy should be useful and limited. Too many low-value messages train users to disable the permission.",
    takeaway: "FCM is reliable when the app treats token lifecycle and permission UX as first-class parts of the feature.",
    related: ["android-permissions-react-native", "react-native-android-deployment", "environment-variables-node-nextjs"],
  },
  {
    slug: "react-native-flatlist-performance",
    title: "React Native FlatList Performance For Large Screens",
    description: "How I tune FlatList rendering, keys, pagination, item layout, images, and memoized rows in React Native apps.",
    date: "2026-07-24",
    category: "React Native",
    tags: ["React Native", "Performance", "FlatList", "Mobile Development"],
    keywords: ["React Native FlatList performance", "FlatList optimization", "mobile list performance"],
    codeKey: "rnFlatList",
    format: "guide",
    accent: "#06B6D4",
    imageAlt: "React Native FlatList performance illustration with virtualized mobile list rows",
    lead: "A mobile list can feel slow even when the API is fast. Rendering too many rows, unstable keys, and heavy images usually show up as dropped frames.",
    focus: "I start by checking whether the screen should use FlatList instead of ScrollView. Any list that can grow from real data deserves virtualization.",
    pattern: "Stable keys, small row components, fixed image dimensions, and thoughtful batch settings solve many list issues before deeper optimization is needed.",
    mistakes: ["Using array indexes as keys for filtered data.", "Rendering large images without resizing or caching strategy.", "Creating inline functions and heavy formatting for every row.", "Nesting virtualized lists inside ScrollView without a strong reason."],
    production: "I test list performance on a lower-end Android device or emulator profile. Fast development machines hide list problems too easily.",
    takeaway: "FlatList performance is mostly about respecting mobile limits. Render what the user needs now and keep each row cheap.",
    related: ["react-performance-optimization", "react-native-android-app-development", "mobile-form-ux-react-native"],
  },
  {
    slug: "react-native-native-modules-when-needed",
    title: "When A React Native App Needs Native Modules",
    description: "How I decide whether to add a native module, use an existing package, or adjust product requirements in React Native apps.",
    date: "2026-07-23",
    category: "Mobile Development",
    tags: ["React Native", "Native Modules", "Android", "Mobile Development"],
    keywords: ["React Native native modules", "Android native module", "React Native packages"],
    codeKey: "rnReleaseConfig",
    format: "architecture",
    accent: "#64748B",
    imageAlt: "React Native native module illustration connecting JavaScript and Android layers",
    lead: "Native modules are useful, but they raise the maintenance level of a React Native app. I add them only when the product value is worth the native surface area.",
    focus: "The decision starts with the feature: does an existing stable package solve it, does the app need a custom Android SDK, or can the requirement be simplified?",
    pattern: "When native code is needed, I keep the JavaScript API small and documented. The screen should not need to know native setup details.",
    mistakes: ["Adding a native dependency before checking release build support.", "Ignoring Android version compatibility.", "Leaving setup steps undocumented for the next developer.", "Wrapping too much behavior in a native module instead of exposing a small capability."],
    production: "Every native dependency belongs in the release checklist. I test clean installs, release builds, and app updates after adding native code.",
    takeaway: "Native modules are not scary when they are intentional. They just need stronger ownership than a normal JavaScript helper.",
    related: ["expo-vs-react-native-cli-practical-choice", "debugging-react-native-release-builds", "react-native-android-deployment"],
  },
  {
    slug: "debugging-react-native-release-builds",
    title: "Debugging React Native Android Release Builds",
    description: "A release-mode debugging checklist for React Native Android apps, covering environment values, minification, assets, signing, and device logs.",
    date: "2026-07-22",
    category: "React Native",
    tags: ["React Native", "Android", "Debugging", "Deployment"],
    keywords: ["React Native release build debugging", "Android release build", "React Native deployment issues"],
    codeKey: "rnReleaseConfig",
    format: "debug",
    accent: "#EF4444",
    imageAlt: "React Native release build debugging illustration with Android logs and build artifacts",
    lead: "Release builds can expose problems that debug mode never shows. The API URL changes, Metro is gone, minification may run, and the app behaves closer to what users install.",
    focus: "I reproduce the issue on a real device with a release APK first. Then I check environment configuration, network calls, missing assets, permission behavior, and native logs.",
    pattern: "A clean build helps remove stale artifacts from the investigation. After that, device logs and server logs usually tell the story faster than guessing.",
    mistakes: ["Testing only debug mode before store upload.", "Pointing the release app to localhost or staging by accident.", "Forgetting that console logs may be removed or harder to access.", "Ignoring Proguard or minification changes when native packages are involved."],
    production: "I keep release configuration documented so future builds are repeatable. Build commands, version codes, keystore ownership, and environment files should not live only in memory.",
    takeaway: "Release-mode testing is where a React Native app proves it is ready for users, not just ready for development.",
    related: ["react-native-android-deployment", "apk-aab-react-native-build-workflow", "android-permissions-react-native"],
  },
  {
    slug: "mobile-form-ux-react-native",
    title: "Mobile Form UX Details That Matter In React Native",
    description: "How keyboard behavior, validation, touch targets, loading states, and API errors shape better React Native mobile forms.",
    date: "2026-07-21",
    category: "Mobile Development",
    tags: ["React Native", "Forms", "Mobile UX", "Android"],
    keywords: ["React Native mobile forms", "mobile form UX", "React Native keyboard handling"],
    codeKey: "reactForm",
    format: "checklist",
    accent: "#EC4899",
    imageAlt: "React Native mobile form UX illustration with keyboard and validation states",
    lead: "Mobile forms have less space and less patience. A form that is fine on desktop can become frustrating when the keyboard covers the submit button.",
    focus: "I check keyboard avoidance, field order, input types, validation timing, loading feedback, and touch target size. The user should never wonder whether a tap worked.",
    pattern: "Short forms can validate on blur and submit. Longer forms often need section-level feedback so users do not reach the end before learning something is wrong.",
    mistakes: ["Using a generic text keyboard for email or phone fields.", "Showing a toast for a field-specific error.", "Letting the keyboard hide the primary action.", "Making loading states block the entire screen when only one field is checking."],
    production: "I test forms on small Android screens and with slow network mode. These two conditions reveal most mobile form issues quickly.",
    takeaway: "Good mobile form UX is a collection of small decisions that reduce effort at exactly the right moments.",
    related: ["react-form-handling-validation-errors", "accessible-react-interfaces-checklist", "react-native-navigation-flow-patterns"],
  },
  {
    slug: "apk-aab-react-native-build-workflow",
    title: "APK And AAB Build Workflow For React Native Android",
    description: "How I think about APK testing, AAB release artifacts, version codes, signing, and pre-upload checks in React Native Android projects.",
    date: "2026-07-20",
    category: "React Native",
    tags: ["React Native", "Android", "APK", "AAB"],
    keywords: ["React Native APK AAB", "Android build workflow", "React Native release artifact"],
    codeKey: "rnReleaseConfig",
    format: "guide",
    accent: "#16A34A",
    imageAlt: "Android APK and AAB build workflow illustration with release artifacts",
    lead: "APK and AAB files serve different release jobs. I use APKs for direct testing and AABs for Play Store upload when the release is ready.",
    focus: "Before generating artifacts, I confirm environment values, app version, version code, signing configuration, icons, splash screen, permissions, and API endpoints.",
    pattern: "The build workflow should be repeatable from a release branch. If a developer cannot rebuild the same artifact later, the process is too fragile.",
    mistakes: ["Forgetting to increase versionCode before upload.", "Sharing keystore passwords in source control.", "Testing an APK built with staging configuration.", "Uploading without installing the release build on a real device."],
    production: "I keep a release checklist beside the app, not inside chat messages or memory. It saves time when updates become routine.",
    takeaway: "A successful Android build is not only a Gradle result. It is a verified artifact that matches the release plan.",
    related: ["react-native-android-deployment", "debugging-react-native-release-builds", "expo-vs-react-native-cli-practical-choice"],
  },
  {
    slug: "node-express-controller-architecture",
    title: "Controller Architecture For Node.js And Express APIs",
    description: "How I organize Express controllers, services, request validation, response shapes, and database calls in MERN applications.",
    date: "2026-07-19",
    category: "Backend",
    tags: ["Node.js", "Express.js", "REST API", "Backend"],
    keywords: ["Express controller architecture", "Node.js API structure", "MERN backend"],
    codeKey: "expressController",
    format: "architecture",
    accent: "#22C55E",
    imageAlt: "Express controller architecture illustration with routes, controllers, and database",
    lead: "A controller should be easy to scan. It receives a request, asks the right layer to do work, and returns a predictable response.",
    focus: "I keep routing, auth middleware, validation, controller logic, and database helpers separate enough that each file has a clear job. The goal is clarity, not a complicated folder system.",
    pattern: "For many MERN APIs, a controller plus model is enough at first. I introduce services when business logic starts repeating across endpoints.",
    mistakes: ["Putting validation, authorization, database writes, and email sending into one long controller.", "Returning different response shapes for similar endpoints.", "Catching errors but never passing them to centralized middleware.", "Letting frontend-specific naming leak into database models."],
    production: "A consistent controller structure makes API debugging faster. Logs can include route, user, status, and request id without changing every endpoint.",
    takeaway: "Good Express architecture keeps endpoints predictable. That is what frontend integration needs most.",
    related: ["node-express-rest-apis", "express-middleware-auth-logging-errors", "validating-express-api-inputs"],
  },
  {
    slug: "express-middleware-auth-logging-errors",
    title: "Express Middleware For Auth, Logging, And Errors",
    description: "How middleware helps keep authentication, request logging, parsing, rate limits, and error handling out of Express controllers.",
    date: "2026-07-18",
    category: "Backend",
    tags: ["Express.js", "Middleware", "Authentication", "Backend"],
    keywords: ["Express middleware", "Node.js authentication middleware", "Express logging"],
    codeKey: "expressMiddleware",
    format: "guide",
    accent: "#84CC16",
    imageAlt: "Express middleware chain illustration with auth, logging, and error steps",
    lead: "Middleware is useful when several routes need the same behavior. Auth checks, request ids, logging, parsing, CORS, and error handling should not be copied into every controller.",
    focus: "I think of middleware as a pipeline. Each step should either add safe context, reject the request clearly, or pass control to the next handler.",
    pattern: "Auth middleware can verify a token and attach a small user object to the request. Controllers can then focus on permissions and feature logic.",
    mistakes: ["Doing database-heavy work in middleware for routes that do not need it.", "Calling next after already sending a response.", "Throwing errors without a central error handler.", "Attaching sensitive token data to request objects that later get logged."],
    production: "In production, middleware order matters. Security headers, body limits, CORS, auth, routes, and error handling should be arranged deliberately.",
    takeaway: "Middleware keeps an Express API tidy when each function does one repeatable job.",
    related: ["jwt-authentication-mern-apps", "express-error-handling-production", "api-security-checklist-mern"],
  },
  {
    slug: "jwt-authentication-mern-apps",
    title: "JWT Authentication Patterns In MERN Applications",
    description: "How I approach JWT login flows, token payloads, middleware, expiry, frontend storage decisions, and logout behavior in MERN apps.",
    date: "2026-07-17",
    category: "Backend",
    tags: ["JWT", "Authentication", "Node.js", "MERN Stack"],
    keywords: ["JWT authentication MERN", "Node.js JWT auth", "React auth state"],
    codeKey: "jwt",
    format: "architecture",
    accent: "#F97316",
    imageAlt: "JWT authentication flow illustration with user, token, and API middleware",
    lead: "Authentication bugs are expensive because they affect trust. I keep JWT flows simple, explicit, and easy to expire.",
    focus: "A token should contain only the claims needed by the API, such as user id and role. Sensitive profile details belong in the database, not inside the token payload.",
    pattern: "The frontend stores auth state carefully, sends the token through a consistent API client, and handles expiry by redirecting or refreshing based on the product rules.",
    mistakes: ["Putting passwords or private profile data into JWT payloads.", "Using very long expiry times without a logout plan.", "Checking only authentication when the route also needs authorization.", "Persisting stale user state after the token is invalid."],
    production: "I rotate secrets carefully, keep JWT_SECRET out of public variables, and test expired token behavior before release.",
    takeaway: "JWT auth is manageable when the token has a small job and every route knows what level of access it requires.",
    related: ["persisted-auth-state-redux-toolkit", "express-middleware-auth-logging-errors", "api-security-checklist-mern"],
  },
  {
    slug: "validating-express-api-inputs",
    title: "Validating Express API Inputs Without Making Controllers Messy",
    description: "How I handle required fields, safe parsing, validation errors, reusable rules, and frontend-friendly responses in Express APIs.",
    date: "2026-07-16",
    category: "Backend",
    tags: ["Express.js", "Validation", "REST API", "Backend"],
    keywords: ["Express API validation", "Node.js validation", "REST validation errors"],
    codeKey: "validation",
    format: "checklist",
    accent: "#38BDF8",
    imageAlt: "Express API validation illustration with request body and field errors",
    lead: "Validation protects both the user experience and the database. A bad request should fail early with a message the frontend can show clearly.",
    focus: "I validate shape, required fields, lengths, enum values, and unsafe input before database work. The API should not wait until Mongoose throws a cryptic error.",
    pattern: "A reusable validator can return ok, data, and errors. Controllers can then return a 400 response with field-level messages.",
    mistakes: ["Trusting the frontend to validate everything.", "Returning one generic invalid data message for field-specific problems.", "Letting empty strings pass because the property exists.", "Mixing validation and database mutation in the same block."],
    production: "Validation messages should be helpful without revealing internal rules that attackers can abuse. It is a balance between user clarity and API safety.",
    takeaway: "Clean validation makes the frontend smoother and keeps backend data more predictable.",
    related: ["react-form-handling-validation-errors", "mongoose-validation-hooks-patterns", "express-error-handling-production"],
  },
  {
    slug: "express-error-handling-production",
    title: "Production Error Handling In Express APIs",
    description: "How I structure Express error handlers, status codes, request ids, safe messages, logging, and frontend-friendly failure responses.",
    date: "2026-07-15",
    category: "Backend",
    tags: ["Express.js", "Error Handling", "Node.js", "Production"],
    keywords: ["Express error handling", "Node.js production errors", "API error response"],
    codeKey: "errorHandler",
    format: "debug",
    accent: "#EF4444",
    imageAlt: "Express production error handling illustration with logs and response states",
    lead: "An API error should help two people at once: the user who needs a safe message and the developer who needs enough detail to fix the issue.",
    focus: "I use centralized error middleware so controllers do not invent their own failure response shapes. Known errors get specific status codes; unexpected errors get a safe generic message.",
    pattern: "Request ids are useful because frontend reports, backend logs, and hosting logs can all point to the same failed request.",
    mistakes: ["Returning stack traces to the browser in production.", "Sending 200 responses with error messages inside the body.", "Logging sensitive headers or passwords.", "Catching errors in controllers and forgetting to return a response."],
    production: "Production logs should include route, method, status, request id, and a safe error summary. That is usually enough to start debugging without exposing private data.",
    takeaway: "Good API error handling makes failure states consistent. The frontend can trust the contract, and developers can trace problems faster.",
    related: ["javascript-error-handling-frontend-apis", "api-security-checklist-mern", "express-middleware-auth-logging-errors"],
  },
  {
    slug: "rest-api-pagination-filtering-sorting",
    title: "Pagination, Filtering, And Sorting In REST APIs",
    description: "How I design query parameters, limits, metadata, indexes, and response shapes for scalable REST API list endpoints.",
    date: "2026-07-14",
    category: "Backend",
    tags: ["REST API", "Pagination", "Node.js", "MongoDB"],
    keywords: ["REST API pagination", "API filtering sorting", "MongoDB paginated API"],
    codeKey: "pagination",
    format: "guide",
    accent: "#0EA5E9",
    imageAlt: "REST API pagination illustration with pages, filters, and sorted records",
    lead: "List endpoints start easy and become slow when the product grows. Search, filters, sort menus, and load more buttons all need backend support.",
    focus: "I make pagination explicit with page, limit, total, and hasMore or totalPages. The frontend should not guess whether more data exists.",
    pattern: "Filters should map to indexed fields where possible. Sort options should be whitelisted so the API does not accept arbitrary database fields.",
    mistakes: ["Returning every record and asking the frontend to filter.", "Allowing unlimited page sizes.", "Sorting by fields that do not have supporting indexes.", "Changing response metadata between endpoints."],
    production: "I test pagination with real data volume or seeded data. A query that feels instant with 20 documents can struggle with 20,000.",
    takeaway: "Good pagination is a contract between UI and database. Both sides need to know how the list grows.",
    related: ["mongodb-indexing-query-speed", "api-integration-patterns-react", "mongodb-lean-projections-performance"],
  },
  {
    slug: "file-uploads-node-apis-cloudinary",
    title: "Planning File Uploads In Node.js APIs With Cloudinary",
    description: "A practical upload architecture for Node.js APIs using validation, temporary files, Cloudinary-style storage, database references, and cleanup.",
    date: "2026-07-13",
    category: "Backend",
    tags: ["Node.js", "File Uploads", "Cloudinary", "Backend"],
    keywords: ["Node.js file uploads", "Cloudinary upload API", "image upload backend"],
    codeKey: "upload",
    format: "architecture",
    accent: "#7C3AED",
    imageAlt: "Node.js file upload illustration with image storage and database reference",
    lead: "File uploads should be designed as a flow, not a single endpoint. The API receives a file, validates it, stores it, saves references, and cleans up failures.",
    focus: "Cloudinary is a common storage option for images, but the architecture matters even if the storage provider changes. The database should store the public URL and provider id, not the raw file.",
    pattern: "I validate file type and size before upload. After storage succeeds, the product document can save the image URL and public id so replacements and deletes remain possible.",
    mistakes: ["Accepting any file type because the frontend has a file picker.", "Saving only the image URL and losing the provider id needed for cleanup.", "Leaving temporary files after failed uploads.", "Uploading large originals when the UI only needs a compressed display image."],
    production: "Uploads need limits, error messages, and monitoring because storage costs and payload size can grow quietly.",
    takeaway: "A reliable upload feature thinks about the whole lifecycle: accept, validate, store, reference, replace, and delete.",
    related: ["api-security-checklist-mern", "validating-express-api-inputs", "nextjs-api-routes-contact-forms"],
  },
  {
    slug: "api-security-checklist-mern",
    title: "A Practical API Security Checklist For MERN Apps",
    description: "Security checks I use for MERN APIs, covering authentication, authorization, validation, CORS, secrets, rate limits, and safe errors.",
    date: "2026-07-12",
    category: "Backend",
    tags: ["API Security", "MERN Stack", "Node.js", "Express.js"],
    keywords: ["MERN API security", "Node.js API security checklist", "Express security"],
    codeKey: "expressMiddleware",
    format: "checklist",
    accent: "#DC2626",
    imageAlt: "MERN API security illustration with protected routes and request checks",
    lead: "API security is not one library. It is a set of small checks that close common gaps before the app reaches real users.",
    focus: "I start with authentication, authorization, input validation, CORS, safe error messages, environment variables, and sensible request size limits.",
    pattern: "Each protected route should answer two questions: who is the user, and are they allowed to perform this action on this resource?",
    mistakes: ["Checking that a token exists but not checking the user's role or ownership.", "Using permissive CORS in production.", "Returning detailed internal errors to the browser.", "Committing secrets or using public environment variables for private keys."],
    production: "Security should be part of deployment review. A working API is not finished until its unsafe defaults are removed.",
    takeaway: "Good API security is mostly consistent discipline. The earlier it is built into the route pattern, the less painful it becomes.",
    related: ["jwt-authentication-mern-apps", "cors-production-api-debugging", "environment-variables-node-nextjs"],
  },
  {
    slug: "environment-variables-node-nextjs",
    title: "Environment Variables In Node.js And Next.js Projects",
    description: "How I organize public and private environment variables, deployment values, local files, API URLs, and production safety checks.",
    date: "2026-07-11",
    category: "Backend",
    tags: ["Environment Variables", "Node.js", "Next.js", "Deployment"],
    keywords: ["Next.js environment variables", "Node.js env config", "production environment variables"],
    codeKey: "envConfig",
    format: "guide",
    accent: "#475569",
    imageAlt: "Environment variable configuration illustration with local and production settings",
    lead: "Environment variables are small strings that can break an entire deployment. API URLs, database URIs, mail credentials, and JWT secrets all need clear ownership.",
    focus: "In Next.js, I treat NEXT_PUBLIC values as visible to the browser. Private keys stay server-only, and the app validates required variables during startup or build.",
    pattern: "A central config helper makes missing values fail early. It is better to stop the build than deploy a contact form with no mail credentials or an API route with no database URI.",
    mistakes: ["Putting secrets in NEXT_PUBLIC variables.", "Using local API URLs in production builds.", "Changing deployment variables without redeploying.", "Letting undefined values travel deep into controllers before failing."],
    production: "I keep a deployment checklist that maps every required variable to the hosting platform. That reduces last-minute guessing.",
    takeaway: "Environment configuration is part of application architecture. Treat it clearly and deployments become calmer.",
    related: ["nextjs-production-build-debugging", "mongodb-atlas-production-connection", "deploying-nextjs-vercel-production"],
  },
  {
    slug: "mongodb-schema-design-ecommerce",
    title: "MongoDB Schema Design For E-Commerce Products",
    description: "How I model products, categories, inventory, images, pricing, and order references in MongoDB for MERN e-commerce applications.",
    date: "2026-07-10",
    category: "Database",
    tags: ["MongoDB", "Mongoose", "E-Commerce", "Database"],
    keywords: ["MongoDB ecommerce schema", "Mongoose product schema", "MERN ecommerce database"],
    codeKey: "mongooseSchema",
    format: "architecture",
    accent: "#16A34A",
    imageAlt: "MongoDB e-commerce schema illustration with product and order documents",
    lead: "MongoDB schema design starts with the screens and queries the product needs. A product list, product detail page, cart, and admin inventory view all read data differently.",
    focus: "I keep frequently-read product card fields together: name, slug, price, primary image, category, stock, and publish status. That makes list queries simple and fast.",
    pattern: "References are useful for relationships that change independently, while embedded fields are useful when the data is read together and updated together.",
    mistakes: ["Embedding everything until documents become difficult to update.", "Referencing everything and forcing many joins for simple screens.", "Skipping unique slugs and creating duplicate product URLs.", "Forgetting inventory edge cases around checkout."],
    production: "The best schema is tested against real queries. I check product listing, search, admin update, and order creation before calling the model finished.",
    takeaway: "MongoDB works well for e-commerce when the document shape follows the product's read patterns.",
    related: ["mongodb-full-stack-developers", "mongodb-indexing-query-speed", "rest-api-pagination-filtering-sorting"],
  },
  {
    slug: "mongoose-validation-hooks-patterns",
    title: "Mongoose Validation And Hooks Without Surprises",
    description: "How I use Mongoose schemas, validation, defaults, indexes, pre-save hooks, and model methods carefully in MERN projects.",
    date: "2026-07-09",
    category: "Database",
    tags: ["Mongoose", "MongoDB", "Validation", "Database"],
    keywords: ["Mongoose validation", "Mongoose hooks", "MongoDB schema validation"],
    codeKey: "mongooseSchema",
    format: "guide",
    accent: "#15803D",
    imageAlt: "Mongoose validation illustration with schema rules and hooks",
    lead: "Mongoose gives MongoDB useful structure, but too much hidden behavior can make debugging harder. I use schemas to protect data without hiding business logic.",
    focus: "Required fields, trim, enum values, min and max rules, defaults, and timestamps are good schema-level rules. Complex workflow decisions usually belong in services or controllers.",
    pattern: "Hooks are useful for predictable model behavior such as hashing a password before save. I avoid hooks that make network calls or update unrelated collections invisibly.",
    mistakes: ["Depending on hooks for business flows that need clear error handling.", "Forgetting that update operations may bypass some validation unless configured.", "Creating indexes in the schema but never checking production index state.", "Letting schema defaults hide missing frontend fields."],
    production: "I test model behavior with create, update, invalid input, and duplicate values. Validation bugs often appear in update paths first.",
    takeaway: "Mongoose is strongest when it enforces data shape and leaves feature decisions visible in the application layer.",
    related: ["validating-express-api-inputs", "mongodb-schema-design-ecommerce", "mongodb-indexing-query-speed"],
  },
  {
    slug: "mongodb-indexing-query-speed",
    title: "MongoDB Indexing Basics For Faster Queries",
    description: "How I choose indexes for MongoDB list pages, search fields, filters, sorts, unique slugs, and dashboard queries.",
    date: "2026-07-08",
    category: "Database",
    tags: ["MongoDB", "Indexing", "Performance", "Database"],
    keywords: ["MongoDB indexing", "MongoDB query performance", "Mongoose indexes"],
    codeKey: "mongoIndex",
    format: "checklist",
    accent: "#22C55E",
    imageAlt: "MongoDB indexing illustration with query paths and indexed fields",
    lead: "Indexes are one of the easiest ways to improve MongoDB performance, but they should follow real query patterns. Adding indexes blindly can slow writes and confuse maintenance.",
    focus: "I look at the filters and sorts used by the app. Product lists often need category plus publish status plus created date. Blog routes need a stable slug lookup.",
    pattern: "Unique indexes protect data rules, compound indexes support common list queries, and text indexes can help basic search when a dedicated search service is not needed.",
    mistakes: ["Indexing every field because queries might use it someday.", "Sorting by a field that is not part of the supporting index.", "Forgetting unique indexes for slugs or email fields.", "Not checking explain output when a query remains slow."],
    production: "Index changes should be planned carefully on large collections. Building an index in production can affect write performance if handled casually.",
    takeaway: "A good index is connected to a real screen, endpoint, or data rule. That connection keeps database performance practical.",
    related: ["mongodb-full-stack-developers", "rest-api-pagination-filtering-sorting", "mongodb-lean-projections-performance"],
  },
  {
    slug: "aggregation-pipelines-dashboard-metrics",
    title: "MongoDB Aggregation Pipelines For Dashboard Metrics",
    description: "How I use MongoDB aggregation for totals, grouped results, chart data, date ranges, and reporting endpoints in dashboard projects.",
    date: "2026-07-07",
    category: "Database",
    tags: ["MongoDB", "Aggregation", "Dashboard", "Database"],
    keywords: ["MongoDB aggregation", "dashboard metrics MongoDB", "aggregation pipeline"],
    codeKey: "aggregation",
    format: "guide",
    accent: "#0F766E",
    imageAlt: "MongoDB aggregation dashboard illustration with grouped chart metrics",
    lead: "Dashboards need summaries, not just raw records. Aggregation pipelines are useful when the API needs totals, grouped values, chart data, or date-based reporting.",
    focus: "I build aggregation from the question the dashboard asks: revenue by vendor, orders by status, users by month, or stock by category. The pipeline should answer one clear question.",
    pattern: "A typical reporting pipeline filters early, groups next, sorts or limits after grouping, and returns a response shape the chart can use directly.",
    mistakes: ["Running aggregation across all time when the screen only needs a date range.", "Grouping before filtering and making MongoDB process too much data.", "Returning raw aggregation field names that the frontend has to untangle.", "Forgetting indexes on match fields used at the start of the pipeline."],
    production: "For heavy dashboards, I consider caching or precomputed summaries. Not every chart needs to recalculate from raw orders on every refresh.",
    takeaway: "Aggregation is most valuable when it turns database work into a clear product metric, not when it becomes a hidden data puzzle.",
    related: ["mongodb-indexing-query-speed", "mongodb-lean-projections-performance", "react-native-flatlist-performance"],
  },
  {
    slug: "mongodb-lean-projections-performance",
    title: "Using lean And Projections For MongoDB Performance",
    description: "How lean queries, selected fields, DTO-style responses, and smaller payloads improve MERN API speed and frontend rendering.",
    date: "2026-07-05",
    category: "Database",
    tags: ["MongoDB", "Mongoose", "Performance", "REST API"],
    keywords: ["Mongoose lean performance", "MongoDB projections", "MERN API optimization"],
    codeKey: "leanQuery",
    format: "checklist",
    accent: "#65A30D",
    imageAlt: "MongoDB lean query illustration with selected fields and smaller payloads",
    lead: "A slow API is often returning more data than the screen needs. Mongoose documents are useful when changing data, but list endpoints often need plain objects.",
    focus: "I use select to return only the fields required by the UI and lean when I do not need document methods. That can reduce memory work and payload size for frequently loaded lists.",
    pattern: "Project cards, blog summaries, dropdown options, and dashboard tables usually benefit from field selection. Detail pages can fetch richer data when the user asks for it.",
    mistakes: ["Returning full documents for card grids.", "Using lean and then expecting Mongoose virtuals or methods to be available.", "Sending private fields because the API response mirrors the database document.", "Optimizing the frontend while the backend still ships huge payloads."],
    production: "Smaller responses help web and mobile apps. They reduce network cost, JSON parsing, and rendering pressure.",
    takeaway: "Performance is not only algorithms. Sometimes the fastest fix is to stop sending data the screen never uses.",
    related: ["mongodb-full-stack-developers", "api-integration-patterns-react", "frontend-performance-budget-next-react"],
  },
  {
    slug: "mongodb-atlas-production-connection",
    title: "MongoDB Atlas Connection Checks For Production Apps",
    description: "A practical checklist for MongoDB Atlas connection strings, network access, credentials, environment variables, pooling, and deployment debugging.",
    date: "2026-07-04",
    category: "Database",
    tags: ["MongoDB Atlas", "MongoDB", "Deployment", "Database"],
    keywords: ["MongoDB Atlas production", "MongoDB connection string", "MERN deployment database"],
    codeKey: "atlasConnect",
    format: "debug",
    accent: "#15803D",
    imageAlt: "MongoDB Atlas production connection illustration with cloud database and app server",
    lead: "MongoDB Atlas issues often appear during deployment, not during local development. The code can be correct while the network access or environment value is wrong.",
    focus: "I check the connection string, username, password encoding, database name, IP access rules, environment variable name, and whether the hosting platform actually redeployed after changes.",
    pattern: "A shared database helper should reuse the connection where the platform allows it. Reconnecting on every request can create avoidable load.",
    mistakes: ["Using a local DB_URI name in code while the host has MONGODB_URI.", "Forgetting to encode special characters in the password.", "Allowing all IPs permanently without understanding the tradeoff.", "Logging the full connection string while debugging."],
    production: "Connection errors should be visible in server logs and fail fast enough that the app does not hang silently.",
    takeaway: "Atlas deployment is mostly configuration discipline. The database, app, and host all need the same connection story.",
    related: ["environment-variables-node-nextjs", "node-api-deployment-render-pm2", "mern-deployment-checklist"],
  },
  {
    slug: "redux-toolkit-async-thunks-api-state",
    title: "Redux Toolkit Async Thunks For API State",
    description: "How I use createAsyncThunk for shared loading, success, failure, retry, and normalized API state in React applications.",
    date: "2026-07-03",
    category: "State Management",
    tags: ["Redux Toolkit", "Async State", "React.js", "API Integration"],
    keywords: ["Redux Toolkit async thunk", "Redux API state", "createAsyncThunk"],
    codeKey: "reduxThunk",
    format: "guide",
    accent: "#7C3AED",
    imageAlt: "Redux Toolkit async thunk illustration with pending fulfilled and rejected states",
    lead: "Async state becomes hard when every component handles loading and errors differently. Redux Toolkit can make shared API flows more predictable.",
    focus: "I use createAsyncThunk when the result matters across screens or when several components need the same request status. Local-only requests can stay in a hook.",
    pattern: "The slice should handle pending, fulfilled, and rejected states clearly. A rejected action should carry a message the UI can show without decoding Axios internals.",
    mistakes: ["Using Redux for one-off local form submissions.", "Forgetting to reset stale errors before a new request.", "Saving duplicate copies of the same entity in several slices.", "Swallowing rejected values and leaving the UI stuck in loading."],
    production: "I test refresh, retry, logout, and slow API behavior. Async state bugs often happen after the first successful load.",
    takeaway: "Redux Toolkit is useful when async state needs a shared contract. It should make API behavior clearer, not heavier.",
    related: ["redux-toolkit-react-applications", "api-integration-patterns-react", "redux-selectors-store-architecture"],
  },
  {
    slug: "redux-selectors-store-architecture",
    title: "Redux Selectors And Store Architecture That Stay Clean",
    description: "How selectors, slice boundaries, derived data, normalized state, and component subscriptions keep Redux Toolkit apps maintainable.",
    date: "2026-07-02",
    category: "State Management",
    tags: ["Redux Toolkit", "Selectors", "Store Architecture", "React.js"],
    keywords: ["Redux selectors", "Redux Toolkit architecture", "derived state Redux"],
    codeKey: "selector",
    format: "architecture",
    accent: "#9333EA",
    imageAlt: "Redux selector architecture illustration with store slices and derived UI data",
    lead: "Selectors are where Redux state becomes useful to the UI. They keep components from understanding every detail of the store shape.",
    focus: "I keep slices organized by feature or domain and use selectors to derive visible lists, counts, permissions, and filtered results.",
    pattern: "Derived data should usually be computed in selectors rather than stored separately. That prevents the app from keeping two sources of truth in sync.",
    mistakes: ["Reading deep store paths directly in many components.", "Storing filtered lists when the original list and filter are already available.", "Creating selectors inside components and losing memoization benefits.", "Letting one slice update unrelated domain data."],
    production: "Clean selectors make refactors safer. If the API response changes, fewer components need to know about the change.",
    takeaway: "Redux architecture is healthy when components ask for meaning, not raw storage details.",
    related: ["redux-toolkit-async-thunks-api-state", "react-state-management-decisions", "persisted-auth-state-redux-toolkit"],
  },
  {
    slug: "persisted-auth-state-redux-toolkit",
    title: "Persisted Auth State With Redux Toolkit",
    description: "How I handle persisted login state, hydration, token expiry, logout cleanup, and protected UI with Redux Toolkit.",
    date: "2026-07-01",
    category: "State Management",
    tags: ["Redux Toolkit", "Authentication", "Persisted State", "React.js"],
    keywords: ["Redux persisted auth", "Redux Toolkit authentication", "React auth hydration"],
    codeKey: "persistedState",
    format: "debug",
    accent: "#6D28D9",
    imageAlt: "Persisted Redux auth state illustration with browser storage and protected screens",
    lead: "Persisted auth state is useful until it becomes stale. The app should remember a login, but it also needs to recover when the token expires or the user logs out elsewhere.",
    focus: "I keep token, user, and hydration state explicit. The UI should know the difference between still checking storage and definitely unauthenticated.",
    pattern: "Logout should clear Redux state, storage, API headers, and any cached private data. Partial logout is where many security and UX bugs begin.",
    mistakes: ["Rendering protected screens before auth hydration finishes.", "Persisting the full user object without refreshing it.", "Keeping API authorization headers after logout.", "Assuming local storage exists during server rendering."],
    production: "I test refresh, expired token, logout, and switching accounts. These flows matter more than the first login success.",
    takeaway: "Persisted auth should feel convenient to the user and strict to the app. Both are possible with clear state boundaries.",
    related: ["jwt-authentication-mern-apps", "react-state-management-decisions", "redux-toolkit-react-applications"],
  },
  {
    slug: "git-branching-workflow-small-teams",
    title: "A Git Branching Workflow For Small Development Teams",
    description: "How I use feature branches, focused commits, pull requests, and safe merges for portfolio, MERN, and React Native projects.",
    date: "2026-06-30",
    category: "Git & GitHub",
    tags: ["Git", "GitHub", "Branching", "Workflow"],
    keywords: ["Git branching workflow", "GitHub feature branches", "small team Git workflow"],
    codeKey: "gitWorkflow",
    format: "guide",
    accent: "#F97316",
    imageAlt: "Git branching workflow illustration with feature branches and merge path",
    lead: "A good Git workflow keeps work reviewable. The branch should tell a small story, and the commits should make rollback possible if something goes wrong.",
    focus: "For small teams, I like short-lived feature branches from main, focused commits, and pull requests that describe the change and the test done.",
    pattern: "A branch name should describe the feature, not the developer. I keep unrelated fixes out of the branch so review stays clear.",
    mistakes: ["Working on many unrelated changes in one branch.", "Committing generated files or local environment values by accident.", "Letting a feature branch drift far from main for too long.", "Force-pushing without checking whether someone else depends on the branch."],
    production: "Before merging, I run the project checks and read the diff. Git helps most when the developer still practices careful review.",
    takeaway: "Git workflow is not ceremony. It is a way to keep code changes understandable under real project pressure.",
    related: ["pull-request-review-checklist-github", "resolving-git-merge-conflicts", "github-actions-ci-nextjs"],
  },
  {
    slug: "pull-request-review-checklist-github",
    title: "A Pull Request Review Checklist For GitHub Projects",
    description: "What I check in GitHub pull requests: scope, screenshots, tests, API contracts, accessibility, deployment risk, and rollback safety.",
    date: "2026-06-29",
    category: "Git & GitHub",
    tags: ["GitHub", "Pull Requests", "Code Review", "Workflow"],
    keywords: ["GitHub pull request checklist", "code review checklist", "PR review frontend backend"],
    codeKey: "prCommands",
    format: "checklist",
    accent: "#334155",
    imageAlt: "GitHub pull request review illustration with checklist and changed files",
    lead: "A pull request should make review easier, not just move code from one branch to another. The reviewer needs context, risk, and proof that the change was tested.",
    focus: "I look for scope first. If a PR changes blog content, API routes, theme behavior, and deployment config together, it becomes harder to review safely.",
    pattern: "A good PR description includes what changed, why it changed, how it was tested, screenshots for UI work, and notes about migrations or environment variables.",
    mistakes: ["Opening a large PR without explaining the goal.", "Skipping screenshots for visual changes.", "Changing API response shapes without updating frontend callers.", "Treating review comments as blockers instead of collaboration."],
    production: "For deployment-sensitive PRs, I also ask how to roll back. A simple answer can save a lot of stress later.",
    takeaway: "Good GitHub review culture is practical. It reduces bugs by making the change easier to understand.",
    related: ["git-branching-workflow-small-teams", "github-actions-ci-nextjs", "readme-optimization-developer-portfolio"],
  },
  {
    slug: "resolving-git-merge-conflicts",
    title: "Resolving Git Merge Conflicts Without Losing Work",
    description: "A practical conflict resolution flow using git status, diff, careful file edits, tests, and safe continuation commands.",
    date: "2026-06-28",
    category: "Git & GitHub",
    tags: ["Git", "Merge Conflicts", "Workflow", "Debugging"],
    keywords: ["resolve Git merge conflicts", "Git conflict workflow", "merge conflict debugging"],
    codeKey: "mergeCommands",
    format: "debug",
    accent: "#64748B",
    imageAlt: "Git merge conflict resolution illustration with split code paths",
    lead: "Merge conflicts feel stressful because Git stops at exactly the moment when two versions disagree. The safest response is slow and mechanical.",
    focus: "I start with git status, open the conflicted files, and understand both sides before deleting conflict markers. The goal is not to choose mine or theirs blindly; it is to produce the correct final file.",
    pattern: "After editing, I run the smallest relevant check before continuing the merge or rebase. For UI files, I also inspect the screen if the conflict touched layout or behavior.",
    mistakes: ["Deleting conflict markers without reading both versions.", "Using checkout ours or theirs on a file with mixed changes.", "Continuing a rebase before running tests.", "Resolving generated files while ignoring the source file that created them."],
    production: "When conflicts happen in deployment config or environment code, I ask for extra review. Those files can break builds quietly.",
    takeaway: "A merge conflict is not Git being difficult. It is Git asking for a human decision where automation would be risky.",
    related: ["git-branching-workflow-small-teams", "git-reset-revert-stash-practical", "pull-request-review-checklist-github"],
  },
  {
    slug: "git-reset-revert-stash-practical",
    title: "Git Reset, Revert, And Stash In Practical Workflows",
    description: "When to use git reset, git revert, and git stash while keeping local work safe and project history understandable.",
    date: "2026-06-27",
    category: "Git & GitHub",
    tags: ["Git", "Git History", "Stash", "Workflow"],
    keywords: ["git reset revert stash", "Git history cleanup", "Git safe workflow"],
    codeKey: "resetRevert",
    format: "guide",
    accent: "#F43F5E",
    imageAlt: "Git history tool illustration with reset revert and stash paths",
    lead: "Reset, revert, and stash solve different problems. Confusing them can lose work or make shared history harder to understand.",
    focus: "I use stash for temporary local changes, revert for undoing a commit that may already be shared, and reset mostly for local history cleanup before pushing.",
    pattern: "The safest question is: has this commit been shared? If yes, revert is usually safer. If no, reset may be acceptable when used deliberately.",
    mistakes: ["Using hard reset to clean up without checking uncommitted work.", "Rewriting shared history without coordinating.", "Stashing changes and forgetting they exist.", "Using revert for a local commit that could simply be amended."],
    production: "On production branches, I prefer reversible history. A revert commit explains what happened and keeps the timeline honest.",
    takeaway: "Git history tools are powerful when the developer chooses based on whether the work is local, shared, or temporary.",
    related: ["resolving-git-merge-conflicts", "git-branching-workflow-small-teams", "pull-request-review-checklist-github"],
  },
  {
    slug: "github-actions-ci-nextjs",
    title: "GitHub Actions CI Basics For Next.js Projects",
    description: "How to set up a simple GitHub Actions workflow that installs dependencies, runs lint checks, and builds a Next.js project on pull requests.",
    date: "2026-06-26",
    category: "DevOps",
    tags: ["GitHub Actions", "CI/CD", "Next.js", "DevOps"],
    keywords: ["GitHub Actions Next.js", "CI/CD basics", "Next.js build workflow"],
    codeKey: "githubActions",
    format: "checklist",
    accent: "#2563EB",
    imageAlt: "GitHub Actions CI illustration with build pipeline and pull request checks",
    lead: "CI does not need to start complicated. A workflow that installs dependencies and runs the build already catches many broken pull requests before deployment.",
    focus: "For a Next.js portfolio or MERN frontend, I usually start with npm ci, lint if configured, and npm run build. The point is to make the same check run every time.",
    pattern: "Pull request CI protects main from simple mistakes: missing imports, invalid routes, broken metadata generation, and code that only worked locally.",
    mistakes: ["Running CI with a different Node version than deployment.", "Skipping environment variables needed by the build.", "Letting CI warnings pile up until nobody trusts them.", "Making the workflow so slow that developers avoid opening PRs."],
    production: "CI should match deployment closely enough to be meaningful. It does not need every production secret, but it should fail for the same build problems.",
    takeaway: "Basic CI is a habit that pays back quickly. It gives every change a clean gate before release.",
    related: ["pull-request-review-checklist-github", "deploying-nextjs-vercel-production", "nextjs-production-build-debugging"],
  },
  {
    slug: "readme-optimization-developer-portfolio",
    title: "README Optimization For A Developer Portfolio Repository",
    description: "How I write GitHub README files that explain project purpose, tech stack, setup, scripts, environment variables, screenshots, and deployment.",
    date: "2026-06-25",
    category: "Git & GitHub",
    tags: ["GitHub", "README", "Portfolio", "Documentation"],
    keywords: ["GitHub README portfolio", "developer portfolio README", "project documentation"],
    codeKey: "gitWorkflow",
    format: "guide",
    accent: "#0F172A",
    imageAlt: "GitHub README optimization illustration with repository documentation sections",
    lead: "A README is often the first technical explanation of a project. For a portfolio repository, it should help a recruiter, client, or developer understand the work quickly.",
    focus: "I include the product goal, tech stack, main features, setup steps, scripts, environment variables, screenshots, and deployment link. The README should not force someone to inspect every folder first.",
    pattern: "Screenshots and short feature bullets work better than long paragraphs. Setup instructions should be copyable and match the package manager used by the project.",
    mistakes: ["Leaving the default create-next-app README in a finished portfolio.", "Listing technologies without explaining what they do in the project.", "Forgetting environment variable names.", "Using broken image links or outdated deployment URLs."],
    production: "When the project changes, I update the README in the same PR. Documentation drift makes good projects look unfinished.",
    takeaway: "A strong README is part of the portfolio experience. It shows how clearly the developer communicates technical work.",
    related: ["github-actions-ci-nextjs", "pull-request-review-checklist-github", "semantic-html-for-developer-portfolios"],
  },
  {
    slug: "deploying-nextjs-vercel-production",
    title: "Deploying A Next.js Site To Vercel For Production",
    description: "A practical deployment checklist for Next.js on Vercel, including builds, environment variables, domains, metadata, and post-deploy checks.",
    date: "2026-06-24",
    category: "Deployment",
    tags: ["Next.js", "Vercel", "Deployment", "Production"],
    keywords: ["Next.js Vercel deployment", "Vercel production checklist", "Next.js hosting"],
    codeKey: "deployVercel",
    format: "checklist",
    accent: "#111827",
    imageAlt: "Vercel deployment illustration with Next.js build and production domain",
    lead: "A Vercel deployment is smooth when the project is already honest locally. The production build, environment variables, images, and metadata should all work before pushing.",
    focus: "I run the build, confirm required variables, check dynamic routes, verify sitemap and robots, and open several pages after deploy.",
    pattern: "For blog sites, I check that each article route is crawlable and that canonical URLs point to the production domain, not localhost or a preview URL.",
    mistakes: ["Assuming the dev server proves the production build will pass.", "Forgetting server-only environment variables in the Vercel dashboard.", "Testing only the home page after deploy.", "Leaving preview URLs in shared metadata or canonical links."],
    production: "After deployment, I check the main pages, a few article pages, image loading, contact form behavior, and logs for route errors.",
    takeaway: "Vercel makes deployment convenient, but production confidence still comes from a checklist.",
    related: ["nextjs-production-build-debugging", "nextjs-metadata-seo-canonical", "dns-domain-ssl-deployment-basics"],
  },
  {
    slug: "frontend-deployment-netlify-hostinger",
    title: "Frontend Deployment Notes For Netlify And Hostinger",
    description: "What I check when deploying React or Next.js frontends to Netlify, Hostinger, or similar hosts, including builds, paths, domains, and environment values.",
    date: "2026-06-23",
    category: "Hosting",
    tags: ["Netlify", "Hostinger", "Frontend Deployment", "Hosting"],
    keywords: ["frontend deployment Netlify", "Hostinger React deployment", "frontend hosting checklist"],
    codeKey: "deployVercel",
    format: "guide",
    accent: "#14B8A6",
    imageAlt: "Frontend hosting illustration with build output and domain configuration",
    lead: "Frontend hosting problems usually come from build output, route handling, environment variables, or domain settings. The code may be fine while the host serves it incorrectly.",
    focus: "For React SPAs, the host needs fallback routing so refreshes on nested routes work. For Next.js, the hosting target must support the rendering features the app uses.",
    pattern: "I write down the build command, output directory, Node version, environment variables, and domain records for each deployment. That prevents guessing during updates.",
    mistakes: ["Uploading source files instead of the production build output.", "Forgetting fallback rewrites for client-side routes.", "Using a host that cannot run required Next.js server features.", "Changing DNS and expecting it to update everywhere immediately."],
    production: "After deploy, I test direct refresh on nested routes, image loading, metadata previews, and API base URLs.",
    takeaway: "Frontend deployment is mostly matching the app's rendering model to the host's capabilities.",
    related: ["deploying-nextjs-vercel-production", "dns-domain-ssl-deployment-basics", "cors-production-api-debugging"],
  },
  {
    slug: "node-api-deployment-render-pm2",
    title: "Deploying Node.js APIs With Render Or PM2",
    description: "A practical Node.js deployment checklist covering start commands, environment variables, health checks, logs, PM2, and MongoDB connections.",
    date: "2026-06-22",
    category: "Deployment",
    tags: ["Node.js", "Render", "PM2", "Backend Deployment"],
    keywords: ["Node.js API deployment", "Render Node deployment", "PM2 Express API"],
    codeKey: "pm2",
    format: "architecture",
    accent: "#22C55E",
    imageAlt: "Node.js API deployment illustration with server process and logs",
    lead: "Deploying a Node.js API is not only choosing a host. The app needs a reliable start command, environment values, database access, logs, and a way to restart safely.",
    focus: "Managed platforms such as Render simplify process management. VPS-style hosting often needs PM2 or a similar process manager to keep the app running after crashes or restarts.",
    pattern: "I add a health endpoint, set the production start command, confirm MongoDB connection, and check logs during the first deploy.",
    mistakes: ["Starting the dev command in production.", "Leaving required environment variables undefined.", "Running without process management on a VPS.", "Ignoring server timezone, port, and firewall behavior."],
    production: "A backend deployment should be observable. If the frontend reports a 500, server logs should quickly show whether the issue is auth, database, validation, or a missing variable.",
    takeaway: "Node.js deployment feels much safer when start, config, database, and logs are checked as one system.",
    related: ["mongodb-atlas-production-connection", "environment-variables-node-nextjs", "mern-deployment-checklist"],
  },
  {
    slug: "dns-domain-ssl-deployment-basics",
    title: "DNS, Domains, SSL, And HTTPS For Web Deployments",
    description: "A practical explanation of domain records, DNS propagation, SSL certificates, HTTPS redirects, www vs apex domains, and deployment checks.",
    date: "2026-06-21",
    category: "Hosting",
    tags: ["DNS", "SSL", "HTTPS", "Hosting"],
    keywords: ["DNS deployment basics", "SSL HTTPS setup", "domain configuration web app"],
    codeKey: "deployVercel",
    format: "checklist",
    accent: "#0EA5E9",
    imageAlt: "DNS and SSL deployment illustration with domain records and HTTPS certificate",
    lead: "A web app is not really ready until the domain works cleanly. DNS, SSL, redirects, and canonical URLs all shape how users and search engines reach the site.",
    focus: "I identify the apex domain, www behavior, required A or CNAME records, SSL status, and whether HTTP redirects to HTTPS.",
    pattern: "For SEO, one canonical domain should win. If both www and non-www work, they should agree through redirects and metadata.",
    mistakes: ["Changing DNS repeatedly before propagation has time to settle.", "Pointing www and apex to different apps by accident.", "Forgetting to update canonical URLs after adding a custom domain.", "Ignoring mixed-content issues where HTTP assets load on an HTTPS page."],
    production: "After DNS changes, I test the site from the final domain, not only the hosting preview URL. Metadata, sitemap, robots, and API calls should all use the right origin.",
    takeaway: "Domain setup is infrastructure and SEO at the same time. A clean HTTPS domain makes the deployment feel complete.",
    related: ["deploying-nextjs-vercel-production", "frontend-deployment-netlify-hostinger", "nextjs-metadata-seo-canonical"],
  },
  {
    slug: "cors-production-api-debugging",
    title: "Debugging CORS Issues Between Frontend And Backend",
    description: "How I debug production CORS errors involving origins, credentials, preflight requests, headers, API URLs, and deployment domains.",
    date: "2026-06-20",
    category: "Deployment",
    tags: ["CORS", "REST API", "Deployment", "Backend"],
    keywords: ["CORS production debugging", "frontend backend CORS", "Express CORS config"],
    codeKey: "cors",
    format: "debug",
    accent: "#F97316",
    imageAlt: "CORS debugging illustration with browser, frontend origin, and API server",
    lead: "CORS errors look like frontend problems because the browser shows them, but the fix is usually in backend headers or deployment URLs.",
    focus: "I confirm the exact frontend origin, API URL, request method, credentials setting, and whether the browser is sending a preflight request.",
    pattern: "Production CORS should allow known domains, not every origin. If cookies or auth headers are involved, credentials settings must match on both frontend and backend.",
    mistakes: ["Allowing localhost but forgetting the production domain.", "Using wildcard origins with credentials.", "Debugging the browser message without checking the network preflight response.", "Changing frontend API URLs without updating backend CORS."],
    production: "I keep allowed origins in environment configuration so staging and production can differ safely.",
    takeaway: "CORS becomes easier when you treat origins as deployment configuration, not as random browser behavior.",
    related: ["api-security-checklist-mern", "environment-variables-node-nextjs", "frontend-deployment-netlify-hostinger"],
  },
  {
    slug: "mern-deployment-checklist",
    title: "A MERN Deployment Checklist For Production Releases",
    description: "A practical end-to-end deployment checklist for MERN apps covering frontend build, backend API, MongoDB Atlas, CORS, SSL, environment variables, and logs.",
    date: "2026-06-19",
    category: "Deployment",
    tags: ["MERN Stack", "Deployment", "MongoDB Atlas", "Production"],
    keywords: ["MERN deployment checklist", "React Node MongoDB deployment", "production release checklist"],
    codeKey: "envConfig",
    format: "checklist",
    accent: "#10B981",
    imageAlt: "MERN deployment checklist illustration with frontend backend database and domain",
    lead: "A MERN deployment has several moving parts. The frontend, backend, database, domain, CORS, environment variables, and logs all need to agree.",
    focus: "I check the production build first, then the API start command, MongoDB Atlas access, required secrets, CORS origins, HTTPS domain, and smoke-test flows.",
    pattern: "A release checklist should include direct URLs for the frontend, API health endpoint, database dashboard, hosting logs, and rollback steps.",
    mistakes: ["Testing the frontend without testing API writes.", "Using development database credentials in production.", "Forgetting to update CORS after adding the real domain.", "Deploying without checking server logs after the first requests."],
    production: "After release, I test login if present, main CRUD flow, contact or checkout flow, image loading, sitemap, and mobile layout.",
    takeaway: "Deployment confidence comes from checking the whole system, not celebrating the first successful build command.",
    related: ["node-api-deployment-render-pm2", "mongodb-atlas-production-connection", "cors-production-api-debugging"],
  },
];

const knownTitles = new Map([
  ...Object.entries(originalTitles),
  ...posts.map((post) => [post.slug, post.title]),
]);

function estimateReadingTime(content) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return `${Math.max(4, Math.ceil(words / 190))} min read`;
}

function toFrontmatterList(items) {
  return `[${items.join(", ")}]`;
}

function relatedLinks(post) {
  return post.related
    .map((slug) => {
      const title = knownTitles.get(slug) || slug;
      return `- [${title}](/blog/${slug})`;
    })
    .join("\n");
}

function faqBlock(post) {
  return "";
}

function buildBody(post) {
  const snippet = snippets[post.codeKey];
  const codeBlock = snippet
    ? `
\`\`\`${snippet.language}
${snippet.code.trim()}
\`\`\`
`
    : "";

  const headingMap = {
    guide: ["Where The Problem Starts", "The Pattern I Use", "Common Mistakes", "Production Notes"],
    checklist: ["The Checklist", "A Practical Pattern", "Common Mistakes", "Before Shipping"],
    debug: ["Reproduce The Failure", "The Fix Pattern", "Mistakes That Hide The Real Bug", "Production Debugging Notes"],
    architecture: ["Define The Responsibility", "A Maintainable Shape", "Common Architecture Mistakes", "Production Considerations"],
  };

  const headings = headingMap[post.format] || headingMap.guide;

  return `${post.lead}

![${post.imageAlt}](/assets/blog/${post.slug}.svg "${post.imageAlt}")

## ${headings[0]}

${post.focus}

## ${headings[1]}

${post.pattern}
${codeBlock}
## ${headings[2]}

${post.mistakes.map((item) => `- ${item}`).join("\n")}

## ${headings[3]}

${post.production}

## Related Reading

${relatedLinks(post)}

## Final Thought

${post.takeaway}${faqBlock(post)}
`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapSvgText(text, maxLength = 34) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function buildSvg(post, index) {
  const accent = post.accent;
  const titleLines = wrapSvgText(post.title);
  const category = escapeXml(post.category);
  const visualSeed = index % 5;

  const titleMarkup = titleLines
    .map(
      (line, lineIndex) =>
        `<text x="112" y="${500 + lineIndex * 44}" fill="#F8FAFC" font-family="Arial, sans-serif" font-size="38" font-weight="700">${escapeXml(line)}</text>`
    )
    .join("\n  ");

  const centerVisuals = [
    `<rect x="690" y="178" width="286" height="210" rx="24" fill="#020617" stroke="${accent}" stroke-opacity="0.7"/>
  <path d="M730 245H936" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
  <path d="M730 300H890" stroke="#94A3B8" stroke-width="10" stroke-linecap="round"/>
  <path d="M730 350H920" stroke="#475569" stroke-width="10" stroke-linecap="round"/>`,
    `<rect x="700" y="150" width="180" height="310" rx="30" fill="#020617" stroke="${accent}" stroke-opacity="0.8"/>
  <rect x="724" y="202" width="132" height="34" rx="10" fill="${accent}" fill-opacity="0.9"/>
  <rect x="724" y="268" width="108" height="14" rx="7" fill="#94A3B8"/>
  <rect x="724" y="302" width="128" height="14" rx="7" fill="#475569"/>
  <circle cx="790" cy="414" r="16" fill="${accent}"/>`,
    `<circle cx="824" cy="302" r="118" fill="#020617" stroke="${accent}" stroke-width="12"/>
  <path d="M748 302H900" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  <path d="M824 226V378" stroke="#94A3B8" stroke-width="10" stroke-linecap="round"/>
  <circle cx="824" cy="302" r="24" fill="${accent}"/>`,
    `<rect x="664" y="170" width="330" height="72" rx="16" fill="#020617" stroke="${accent}" stroke-opacity="0.8"/>
  <rect x="664" y="286" width="330" height="72" rx="16" fill="#020617" stroke="#475569"/>
  <rect x="664" y="402" width="330" height="72" rx="16" fill="#020617" stroke="#475569"/>
  <path d="M830 242V286" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  <path d="M830 358V402" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>`,
    `<rect x="650" y="176" width="370" height="260" rx="22" fill="#020617" stroke="${accent}" stroke-opacity="0.75"/>
  <path d="M710 254L765 309L710 364" stroke="${accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M805 364H940" stroke="#94A3B8" stroke-width="14" stroke-linecap="round"/>
  <path d="M805 308H910" stroke="#475569" stroke-width="12" stroke-linecap="round"/>`,
  ][visualSeed];

  return `<svg width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="675" fill="#0F172A"/>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect x="72" y="70" width="1056" height="535" rx="28" fill="#111827" stroke="#334155" stroke-width="2"/>
  <rect x="112" y="116" width="370" height="54" rx="27" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-opacity="0.6"/>
  <text x="140" y="151" fill="${accent}" font-family="Arial, sans-serif" font-size="22" font-weight="700">${category}</text>
  <rect x="112" y="224" width="420" height="30" rx="10" fill="#1F2937"/>
  <rect x="112" y="282" width="500" height="24" rx="8" fill="#1F2937"/>
  <rect x="112" y="328" width="450" height="24" rx="8" fill="#334155"/>
  ${centerVisuals}
  ${titleMarkup}
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="675" gradientUnits="userSpaceOnUse">
      <stop stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="0.52" stop-color="#0F172A" stop-opacity="0.96"/>
      <stop offset="1" stop-color="#22C55E" stop-opacity="0.16"/>
    </linearGradient>
  </defs>
</svg>
`;
}

function writePost(post) {
  const fileName = `${post.slug}.mdx`;
  const filePath = path.join(blogDir, fileName);
  const imagePath = path.join(imageDir, `${post.slug}.svg`);

  if (originalFiles.has(fileName)) {
    throw new Error(`Refusing to write protected original file: ${fileName}`);
  }

  if (fs.existsSync(filePath)) {
    return { post: false, image: false, skipped: true };
  }

  const body = buildBody(post).trim() + "\n";
  const readingTime = estimateReadingTime(body);
  const frontmatter = [
    "---",
    `title: ${post.title}`,
    `description: ${post.description}`,
    `date: ${post.date}`,
    `category: ${post.category}`,
    `tags: ${toFrontmatterList(post.tags)}`,
    `keywords: ${toFrontmatterList(post.keywords)}`,
    "author: Nishitha Reddy Musku",
    `readingTime: ${readingTime}`,
    `image: /assets/blog/${post.slug}.svg`,
    `imageAlt: ${post.imageAlt}`,
    `canonical: ${BLOG_BASE_URL}/blog/${post.slug}`,
    `slug: ${post.slug}`,
    "---",
    "",
  ].join("\n");

  fs.writeFileSync(filePath, frontmatter + body, "utf8");

  if (!fs.existsSync(imagePath)) {
    fs.writeFileSync(imagePath, buildSvg(post, posts.indexOf(post)), "utf8");
    return { post: true, image: true, skipped: false };
  }

  return { post: true, image: false, skipped: false };
}

fs.mkdirSync(blogDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const result = posts.reduce(
  (acc, post) => {
    const written = writePost(post);
    if (written.post) acc.posts += 1;
    if (written.image) acc.images += 1;
    if (written.skipped) acc.skipped += 1;
    return acc;
  },
  { posts: 0, images: 0, skipped: 0 }
);

console.log(
  `Blog expansion complete: ${result.posts} posts written, ${result.images} images written, ${result.skipped} posts skipped.`
);
