import Link from "next/link";

// Define the styles with correct types for flexDirection
const styles = {
  container: {
    textAlign: "center" as const, // Explicitly set the type for textAlign
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  navContainer: {
    display: "flex",
    flexDirection: "column" as const, // Explicitly set the type for flexDirection
    alignItems: "center",
  },
  navLink: {
    textDecoration: "none",
    color: "blue",
    margin: "10px 0",
  },
};

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
          Add Cooking Steps
        </Link>
      </div>
    </div>
  );
}


