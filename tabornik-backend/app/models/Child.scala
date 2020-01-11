package models

import play.api.libs.json.Json


object Child {
  implicit val formater = Json.format[Child]
}

case class Child(id: Int,
                 name: String,
                 age: Int,
                 nickname: String,
                 contact: String,
                 parent: String,
                 paid: Boolean,
                 campId: Int)
