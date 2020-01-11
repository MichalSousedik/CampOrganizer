package models

import play.api.libs.json.Json


object CampDetail {
  implicit val campFormat = Json.format[CampDetail]
}


case class CampDetail(camp: Camp,
                      leader: String,
                      medic: String,
                      backup: String)
