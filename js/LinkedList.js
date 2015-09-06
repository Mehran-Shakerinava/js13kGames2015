/* @constructor */
function Node(prev, data, next)
{
	this.prev = prev;
	this.data = data;
	this.next = next;
}

/* @constructor */
function LinkedList()
{
	this.begin = null;
}

LinkedList.prototype = 
{
	/* Adds a Node to the beginning of the LinkedList. */
	add: function(data) 
	{
		this.begin = new Node(null, data, this.begin);
		if(this.begin.next != null)
			this.begin.next.prev = this.begin;
	},

	del: function(node)
	{
		if(node.prev != null)
			node.prev.next = node.next;
		else
			this.begin = node.next;
		
		if(node.next != null)
			node.next.prev = node.prev;
	}
}