import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to My Recipe Web App</h1>
      <div style={styles.navContainer}>
        {/* Navigation Links */}
        <Link href="/insert-ingredient" style={styles.navLink}>
          Add Ingredient
        </Link>
        <Link href="/insert-method" style={styles.navLink}>
          Add Cooking Method
        </Link>
        <Link href="/generate-recipe" style={styles.navLink}>
          Generate Recipe
        </Link>
        <Link href="/search-recipe" style={styles.navLink}>
          Search Recipes
        </Link>
        <Link href="/insert-tag" style={styles.navLink}>
          View Tag
        </Link>
        <Link href="/insert-cookingsteps" style={styles.navLink}>
          add cooking steps
        </Link>
      </div>
    </div>
  );
}

// Inline styles (optional, replace with CSS module or framework if preferred)
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  navContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  navLink: {
    fontSize: "1.2rem",
    color: "#0070f3",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
};
