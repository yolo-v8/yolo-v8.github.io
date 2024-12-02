class Citation extends HTMLElement {

	constructor() {
		super();

		// Attach a shadow DOM.
		const shadow = this.attachShadow({mode: 'open'});

		// Create a template for the citation.
		const template = document.createElement('template');
		template.innerHTML = `
			<style>
		   	pre {
		   		font-size: 12px;
				line-height: 15px;
				padding: 10px 18px 0px;
				border-radius: 15px;
				background: rgba(181, 9, 172, 0.05);
				color: rgba(38, 152, 186, 1);
				overflow: hidden;
				margin-top: -12px;
				white-space: pre-wrap;
				word-wrap: break-word;
		   	}
           	</style>

		   	<h3>Citation</h3>
           	<p>For attribution, please cite this work as</p>
           	<pre id="cite">
{{authors}}, {{title}}, {{year}}
           	</pre>
        	<p>BibTeX citation</p>
           	<pre id="bibtex">
@misc{yolov8themissingpaper,
  author = { {{authors}} },
  title = { {{title}} },
  description = { {{description}} },
  date = { {{date}} },
  year = { {{year}} },
}
           	</pre>
		`;

		// Clone and attach the template content.
		shadow.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
	    // Parse the Heading JSON.
	    const jsonData = JSON.parse(document.getElementById('heading').textContent);

	    // Parse the year of publication.
	    const date = new Date(jsonData.published);
	    const year = date.getFullYear();

	    // Set the values in the citation.
	    let cite = this.shadowRoot.querySelector('pre');
	   	cite.innerHTML = cite.innerHTML.replace('{{authors}}', jsonData.authors.map(author => author.author).join(", "));
		cite.innerHTML = cite.innerHTML.replace('{{title}}', jsonData.title);
	   	cite.innerHTML = cite.innerHTML.replace('{{year}}', year);

		// Set the values in bibtex.
		let bibtex = this.shadowRoot.querySelectorAll('pre')[1];
        bibtex.innerHTML = bibtex.innerHTML.replace('{{authors}}', jsonData.authors.map(author => author.author).join(" and "));
	    bibtex.innerHTML = bibtex.innerHTML.replace('{{title}}', jsonData.title);
	    bibtex.innerHTML = bibtex.innerHTML.replace('{{description}}', jsonData.description);
	    bibtex.innerHTML = bibtex.innerHTML.replace('{{date}}', jsonData.published);
	    bibtex.innerHTML = bibtex.innerHTML.replace('{{year}}', year);
    }
}

// Define the custom element <d-citation>.
customElements.define('d-citation', Citation);
