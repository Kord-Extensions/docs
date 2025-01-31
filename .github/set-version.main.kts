@file:DependsOn("com.squareup.okhttp3:okhttp:4.11.0")
@file:DependsOn("io.github.z4kn4fein:semver-jvm:1.4.1")
@file:DependsOn("com.google.code.gson:gson:2.10.1")

import com.google.gson.Gson
import com.google.gson.JsonObject
import io.github.z4kn4fein.semver.Version
import okhttp3.OkHttpClient
import okhttp3.Request
import javax.xml.parsers.DocumentBuilderFactory
import javax.xml.xpath.XPathConstants
import javax.xml.xpath.XPathFactory
import kotlin.io.path.Path

val client = OkHttpClient()
val gson = Gson()

val PLUGIN_URL = "https://plugins.gradle.org/m2/dev/kordex/gradle/plugins/kordex/maven-metadata.xml"
val I18N_URL = "https://plugins.gradle.org/m2/dev/kordex/gradle/plugins/i18n/maven-metadata.xml"
val RELEASES_URL = "https://releases-repo.kordex.dev/dev/kordex/kord-extensions/maven-metadata.xml"
val SNAPSHOTS_URL = "https://snapshots-repo.kordex.dev/dev/kordex/kord-extensions/maven-metadata.xml"

val FILE_PATH = Path("Writerside/v.list")

println("Finding the latest version...")

fun get(url: String): String? {
	val request = Request.Builder()
		.url(url)
		.build()

	val response = client.newCall(request).execute()

	if (response.code == 200) {
		return response.body!!.string()
	} else {
		return null
	}
}

fun getLatest(url: String): String? {
	val content = get(url)
		?: return null

	val document = DocumentBuilderFactory.newInstance().newDocumentBuilder()
		.parse(content.byteInputStream())

	return XPathFactory.newInstance().newXPath()
		.compile("metadata/versioning/latest")
		.evaluate(document, XPathConstants.STRING) as String
}

fun getJavaFromModule(url: String): String {
	val moduleJson = get(url)
	println("URL: $url")
	val json = gson.fromJson(moduleJson, JsonObject::class.java)

	return json
		.get("variants").asJsonArray
		.get(0).asJsonObject
		.get("attributes").asJsonObject
		.get("org.gradle.jvm.version").asString
}

val latestSnapshot = getLatest(SNAPSHOTS_URL)?.let { Version.parse(it) }
val latestRelease = getLatest(RELEASES_URL)?.let { Version.parse(it) }

if (latestSnapshot == null && latestRelease == null) {
	println("Unable to find latest snapshot or release version - are either published?")
	System.exit(-1)
}

val latest = if (latestSnapshot == null) {
	latestRelease!!
} else if (latestRelease == null) {
	latestSnapshot!!
} else {
	maxOf(latestSnapshot!!, latestRelease!!)
}

val latestPlugin = getLatest(PLUGIN_URL)?.let { Version.parse(it) }
val latesti18n = getLatest(I18N_URL)?.let { Version.parse(it) }

println("Latest snapshot version: $latestSnapshot")
println("Latest release version: $latestRelease")

println("Finding current java version...")

var javaVersion: String

if ("-SNAPSHOT" in latest.toString()) {
	val baseUrl = "https://snapshots-repo.kordex.dev/dev/kordex/kord-extensions/$latest"

	val metadataXml = get("$baseUrl/maven-metadata.xml")
	val metadataDocument = DocumentBuilderFactory.newInstance().newDocumentBuilder()
		.parse(metadataXml!!.byteInputStream())

	val latestBuild = XPathFactory.newInstance().newXPath()
		.compile("//snapshotVersions/snapshotVersion[1]/value")
		.evaluate(metadataDocument, XPathConstants.STRING) as String

	javaVersion = getJavaFromModule("$baseUrl/kord-extensions-$latestBuild.module")
} else {
	javaVersion = getJavaFromModule(
		"https://releases-repo.kordex.dev/dev/kordex/kord-extensions/$latest/kord-extensions-$latest.module"
	)
}

println("Updating Gradle plugins version in Writerside/v.list to $latestPlugin")
println("Updating i18n version in Writerside/v.list to $latesti18n")
println("Updating KordEx version in Writerside/v.list to $latest")
println("Updating Java version in Writerside/v.list to $javaVersion")

// Uncommented during local testing
// System.exit(0)

val file = FILE_PATH.toFile()
val fileContents = file.readText()

file.writeText(
	fileContents.replace("{VERSION}", latest.toString())
		.replace("{JAVA_VERSION}", javaVersion)
		.replace("{I18N_VERSION}", latesti18n.toString())
		.replace("{PLUGIN_VERSION}", latestPlugin.toString())
)

println("Done!")
