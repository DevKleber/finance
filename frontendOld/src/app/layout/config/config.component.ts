import { Component, OnInit, OnDestroy, Renderer2 } from "@angular/core";
import { version } from "../../../../package.json";

@Component({
	selector: "app-config",
	templateUrl: "./config.component.html",
	styleUrls: ["./config.component.css"],
})
export class ConfigComponent implements OnInit {
	theme: string = "theme-whbl";
	darkmode: boolean;
	pathcss: string = "../assets/css/theme-dark-full.min.css";

	constructor(private renderer: Renderer2) {
		this.renderer.addClass(document.body, this.theme);
	}

	ngOnInit(): void {
		this.darkmode =
			localStorage.getItem("darkmode") == "true" ? true : false;
		this.setTheme();
		this.verifyVersion();
	}
	verifyVersion() {
		if (version != this.getVersionLocalStorage()) {
			console.log("refresh and set version");
			this.setVersionLocalStorage(version);
			window.location.reload();
		}
	}
	setDarkMode() {
		localStorage.setItem("darkmode", JSON.parse(this.darkmode.toString()));
		this.setTheme();
	}
	getVersionLocalStorage() {
		return localStorage.getItem("rifa_version");
	}
	setVersionLocalStorage(version) {
		return localStorage.setItem("rifa_version", version);
	}

	// setTheme(theme) {
	//   this.renderer.removeClass(document.body, 'modal-open');
	//   this.renderer.removeClass(document.body, this.theme);
	//   this.renderer.addClass(document.body, theme);
	//   this.theme = theme;
	// }
	// ngOnDestroy() {
	//   this.renderer.removeClass(document.body, 'theme-whbl');
	// }
	setTheme() {
		this.loadCSS();
	}
	loadCSS() {
		// Get HTML head element
		if (this.darkmode) {
			var head = document.getElementsByTagName("HEAD")[0];

			// Create new link Element
			var link = document.createElement("link");
			// set the attributes for link element
			link.rel = "stylesheet";
			link.type = "text/css";
			link.id = "iddarkmode";
			link.href = this.pathcss;
			// Append link element to HTML head
			head.appendChild(link);
		} else {
			var sheet = document.getElementById("iddarkmode");
			if (sheet != null) sheet.parentNode.removeChild(sheet);
		}
	}
}
