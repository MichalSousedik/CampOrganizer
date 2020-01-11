package dao

import javax.inject.Inject
import models.Child
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

class ChildDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext) extends HasDatabaseConfigProvider[JdbcProfile] {

  import profile.api._

  val children = TableQuery[ChildrenTable]

  def list(campId: Int): Future[Seq[Child]] = db.run {
    children.filter(_.campId === campId).result
  }

  def count(campId: Int): Future[Int] = db.run {
    children.filter(_.campId === campId).result
  }.map(camps => camps.length)

  def update(child: Child) = db.run {
    children.update(child)
  }

  def create(child: Child) = db.run {
    children += child
  }

  def delete(id: Int) = db.run {
    val child = children.filter(_.id === id)
    child.delete
  }

  class ChildrenTable(tag: Tag) extends Table[Child](tag, "CHILD") {
    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def age = column[Int]("AGE")
    def nickname = column[String]("NICKNAME")
    def contact = column[String]("CONTACT")
    def parent = column[String]("PARENT")
    def paid = column[Boolean]("PAID")
    def campId = column[Int]("CAMPID")

    def * = (id, name, age, nickname, contact, parent, paid, campId) <> ((Child.apply _).tupled, Child.unapply)

  }

}

