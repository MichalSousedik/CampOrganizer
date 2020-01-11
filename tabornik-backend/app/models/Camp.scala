package models

import java.sql.Date

import play.api.libs.json.{Json}


object Camp {
  implicit val campFormat = Json.format[Camp]
}

case class Camp (id: Int,
                 name: String,
                 capacity: Int,
                 occupied: Int,
                 address: String,
                 startDate: Date,
                 endDate: Date)

