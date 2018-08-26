import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {
  map = new Map();
  item:string;
  subItem:string;

  //Adding items to each item list
  addItems(){
    if(this.item!=undefined){
      this.map.set(this.item,null);
      this.item=undefined;
    }
  }
 
  //Deleting each Item list
  deleteItem(item){
    if(undefined!=item){
      if(this.map.has(item)){
        this.map.delete(item);
      }
    }
  }

//Add subitems to the each item list
  addSubItems(item){
    if(undefined != this.subItem) {
      let subItems = this.map.get(item);
      if(null == subItems)
        subItems = [];
      subItems.push(this.subItem);
      this.map.set(item,subItems);
      this.subItem = null;
    }
  }

  deleteSubItem(item,subItem){
    //get all the subItems for given item
    let subItems = this.map.get(item);

    //loop through subItems and delete the requested one
    //splice function is used to delete item from array
    subItems.forEach(function (value, index) {
      if(subItem == value)
        subItems.splice(index, 1);
    });
    //set the updated array to Map
    this.map.set(item, subItems);
  }


  getItems(){
    return Array.from(this.map.keys())  
  }
  
  getSubItems(item){
    return this.map.get(item);
  }
  
  sortSubItems(option){
    this.map.get(option).sort();
  }

  allowDrop(event) {
    console.log("Drag over");
    //prevent any default events
    event.preventDefault();
  }

  onDrag(event, srcItem) {
    console.log("Drag Start");

    //set the dragged object details to dataTransfer object
    event.dataTransfer.setData("draggedObj", srcItem+"||"+event.target.innerText);
  }

  onDrop(event, desItem) {
    event.preventDefault();
    console.log("Drop start");

    //get the dragged object details
    var data = event.dataTransfer.getData("draggedObj");

    //split the item and sub item
    let srcArr = data.split("||");

    //delete the subItem from the source
    this.deleteSubItem(srcArr[0], srcArr[1]);

    //add the subItem to the destination
    let subItems = this.map.get(desItem);
    if(null == subItems)
      subItems = [];
    subItems.push(srcArr[1]);
    this.map.set(desItem,subItems);
  }
}