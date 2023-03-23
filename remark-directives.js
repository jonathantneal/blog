import { visit } from 'unist-util-visit'
import { directive } from 'micromark-extension-directive'
import { directiveFromMarkdown, directiveToMarkdown } from 'mdast-util-directive'

function remarkDirectivesFactory() {
	return function remarkDirectives() {
		const data = this.data()

		add('micromarkExtensions', directive())
		add('fromMarkdownExtensions', directiveFromMarkdown)
		add('toMarkdownExtensions', directiveToMarkdown)

		function add(/** @type {string} */ field, value) {
			const list = field in data ? data[field] : (data[field] = [])
		
			list.push(value)
		}

		return (tree) => {
			visit(tree, (node) => {
				if (
					node.type === 'textDirective' ||
					node.type === 'leafDirective' ||
					node.type === 'containerDirective'
				) {
					const data = node.data || (node.data = {})

					data.hName = 'div'
					data.hProperties = Object(data.hProperties)

					for (const attributeName in node.attributes) {
						data.hProperties[attributeName] = [ node.attributes[attributeName] ]
					}

					data.hProperties.className = data.hProperties.className || (data.hProperties.className = [])

					data.hProperties.className.push(node.name)

				}
			})
		}
	}
}

export default remarkDirectivesFactory
