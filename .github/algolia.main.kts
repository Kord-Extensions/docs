import java.nio.file.Files
import kotlin.io.path.Path
import kotlin.io.path.absolutePathString
import kotlin.io.path.extension
import kotlin.system.exitProcess

val LINK_TAG = "<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/@docsearch/css@3\"/>"

val SCRIPT_TAG = """
<script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3"></script>

<script type="text/javascript">
	docsearch({
		appId: "M02COLVI8J",
		apiKey: "588814eabdec644a7039452755b4b621",
		indexName: "kordex",
		container: ".wrapper",
		debug: false
	});
</script>
"""

println("Updating HTML files with Algolia snippets...")

val paths = Files.walk(Path("."))
	.filter(Files::isRegularFile)
	.filter { it.extension == "html" }
	.toList()

if (paths.isEmpty()) {
	println("No files found.")
	exitProcess(0)
}

paths.forEach { path ->
	print("=> ${path.absolutePathString()}")

	try {
		val file = path.toFile()
		val content = file.readText(Charsets.UTF_8)

		file.writeText(
			content
				.replace("</head>", "\t$LINK_TAG\n</head>")
				.replace("</body>", "$SCRIPT_TAG\n</body>")
		)

		print( "Done")
	} catch (e: Exception) {
		print(" Failed: (${e.javaClass.simpleName}) ${e.message}\n")
	}
}

println()
println("Done!")
