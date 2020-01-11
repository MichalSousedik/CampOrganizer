package models

import play.api.libs.json.{Json}


object Worker {
  implicit val format = Json.format[Worker]
}

case class Worker(id: Int,
                  name: String,
                  age: Int,
                  nickname: String) {
}
