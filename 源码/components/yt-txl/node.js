
class  Node {
	constructor(name,number,mail,address) {
	    this.name = name;
		this.number = number;
		this.mail = mail;
		this.address = address;
		this.next = null;  //下一个节点，
	}
}

/**
 *	this 指向本类
 * 此List类（链表）的前提是，电话号码唯一性。
 * 因为一个联系人可以有多个号码。
 * 但是一个号码不可能有多个持有者，是一对一的关系。
 */
class List {
	
	/**
	 * 构造方法
	 * 作用： 初始化链表头节点，但头节点不做存储信息.
	 */
	constructor() {
	    this.head = new Node();
	};
	
	/**
	 * 模糊查找，用于简单的搜索
	 * @param {Stirng} search 所要匹配的字符串
	 * @param {Function} callback 回调函数，用于回调查找到的联系人
	 */
	find(search,callback){
		if(typeof search === 'number'){
			search = search.toString();
		}
		var currNode = this.head;
		while(currNode.next != null){
			currNode = currNode.next;
			if((currNode.name.indexOf(search) > -1) || (currNode.number.toString().indexOf(search) > -1)){
				//保存查找到的联系人;
				if(callback){
					//回调函数，用于查询多个，并返回多个联系人;用于模糊匹配
					callback(currNode);
				}else{
					return currNode;
				}
			}
		}
	};
	
	/**
	 * 精确匹配，主要用于精确查找到联系人，防止单个联系人有多个号码的问题;只认手机号，不认人。
	 * @param {Number} number 相应联系人的号码
	 */
	findNumber(number){
		var currNode = this.head;
		while(currNode.next != null){
			currNode = currNode.next;
			if(number === currNode.number){
				console.log(number);
				return currNode;
			}
		}
		return 1;
	}
	
	/**
	 * 新建联系人，或者 指定位置插入联系人
	 * @param {String} name  联系人的名字
	 * @param {String} number 电话
	 * @param {String} mail   邮箱
	 * @param {String} address 地址
	 * @param {String} item  插入的位置，无则默认最后
	 */
    insert( name,number,mail,address ,item){
    	var newNode = new Node(name,number,mail,address);
    	var currNode = this.head;
    	if(!item){
    		while(currNode.next != null){
    			currNode = currNode.next;
    		}
    	}else{
    		 currNode = this.find(item);
    	}
		currNode.next = newNode;
		console.log(`新增节点 ${newNode.name} -- ${newNode.number} -- ${newNode.address}` );
		return newNode;
    };
	
	/**
	 * 寻找前驱节点，以number为唯一标识,确定节点就靠这个
	 * @param {Object} number 查找的电话号码
	 */
	findPrev(number){
		var prevNode = this.head;
		this.findNumber();
		while ( !( prevNode.next == null) && (prevNode.next.number != number)){
			prevNode = prevNode.next;
		}
		return prevNode;
	};
	
	/**
	 * 删除节点
	 * @param {Object} item 要删除的节点
	 */
	remove(item){
		var prevNode = this.findPrev(item);
		if(!(prevNode.next == null)){
			let removeNode = prevNode.next;
			prevNode.next = prevNode.next.next; //不用清除引用。js有自己的机制清除不用的对象.
			console.log(`删除成功  ${removeNode.name} -- ${removeNode.number} -- ${removeNode.address}`);
		}
	};
	
	/**
	 * 打印所有元素;
	 */
	dispaly(){
		var currNode = this.head;
		var sum = 0;
		while(currNode.next !=null){
			currNode = currNode.next;
			sum++;
			console.log(`${sum} -- ${currNode.name} -- ${currNode.number} -- ${currNode.address}`);
		}
			
	};
}

module.exports = List;


