import { visitParents } from 'unist-util-visit-parents'

/** @typedef {import('unist').Parent} Parent */
/** @typedef {import('unist').Node} Node */

const fromJSON = (value) => {
	try {
		return value == null ? null : JSON.parse(value)
	} catch {
		return null
	}
}

const visited = new WeakSet()

function remarkCodeFactory() {
	return function remarkCodeBlocks() {
		return /** @type {import('unified').CompilerFunction} */ (
			(tree) => {
				visitParents(tree, 'code', (node, /** @type {Parent[]} */ parents) => {
					const [ parent ] = parents
					const meta = fromJSON(node.meta)

					if (meta === null) return
					if (typeof meta !== 'object') return
					if (visited.has(node)) return

					visited.add(node)

					const index = parent.children.indexOf(node)

					// console.log(parent.children[index - 1])

					const children = Object.keys(meta).map(
						field => /** @type {Node} */ ({
							type: 'dl',
							data: {
								hName: 'dl',
							},
							children: [
								{
									type: 'dt',
									data: {
										hName: 'dt',
									},
									children: [
										{
											type: 'text',
											value: field,
										},
									],
								},
								{
									type: 'dd',
									data: {
										hName: 'dd',
									},
									children: [
										{
											type: 'text',
											value: meta[field],
										},
									],
								},
							],
						}),
					)

					if (children.length > 0) {
						parent.children.splice(index, 0, {
							type: 'div',
							data: {
								hName: 'div',
								hProperties: {
									className: [
										'code-meta'
									]
								},
							},
							children,
						})
					}
				})
			}
		)
	}
}

export default remarkCodeFactory
