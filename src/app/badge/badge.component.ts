import { Component, OnInit, Input } from '@angular/core';



class Badge{
  iconeName:String
  color:String
}

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {



nameToIcon = {
  "0":{iconeName:"favorite",
      color:"red"},
  "1":{iconeName:"accessibility_new",
      color:"black"},
  "2":{iconeName:"check_circle",
      color:"green"},
  "3":{iconeName:"done_all",
      color:"dark-gray"},
  "4":{iconeName:"face",
      color:"pink"},
  "5":{iconeName:"home",
      color:"orange"},
  "6":{iconeName:"trending_up",
      color:"Indigo"},
  "7":{iconeName:"warning",
      color:"yellow"},
  "8":{iconeName:"4k",
      color:"MidnightBlue"},
  "9":{iconeName:"error",
      color:"FireBrick"},
  "10":{iconeName:"location_on",
      color:"ForestGreen"},
  "11":{iconeName:"sentiment_satisfied_alt",
      color:"Gold"},
  "12":{iconeName:"block",
      color:"DeepPink"},
  "13":{iconeName:"battery_charging_full",
      color:"GoldenRod"},
  "14":{iconeName:"signal_cellular_4_bar",
      color:"RoyalBlue"},
  "15":{iconeName:"child_care",
      color:"Orchid"}
       
}

@Input()
badgesString:string

badges : string[]
translatedBadge : Badge[] 

  constructor() { }

  ngOnInit() {
    this.translatedBadge = []
    this.badges = this.badgesString.split(" ");
    for (let b of this.badges){
      if(b in this.nameToIcon){
        this.translatedBadge.push(this.nameToIcon[b])
      }

    }
  }


  style = (s) =>{

    return {color:s}

  }

}
