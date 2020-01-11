package dao

import java.sql.Date

import javax.inject.Inject
import models.{Camp, CampDetail}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

class CampDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider) (implicit executionContext: ExecutionContext) extends HasDatabaseConfigProvider[JdbcProfile] {


  import profile.api._

  private val camps = TableQuery[CampsTable]

  def list(): Future[Seq[Camp]] = db.run {
    camps.result
  }

  def get(id: Int): Future[Camp] = db.run {
    camps.filter(_.id === id).result.head
  }

  def create(camp: Camp) = db.run {
    camps+=(camp)
  }

  def delete(id: Int) =  {
    val camp = camps.filter(_.id === id)
    db.run(camp.delete)
  }

  private class CampsTable(tag: Tag) extends Table[Camp](tag, "CAMP") {
    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def capacity = column[Int]("CAPACITY")
    def occupied = column[Int]("OCCUPIED")
    def address = column[String]("ADDRESS")
    def startDate = column[Date]("STARTDATE")
    def endDate = column[Date]("ENDDATE")

    def * = (id, name, capacity, occupied, address, startDate, endDate) <> ((Camp.apply _).tupled, Camp.unapply)

  }

}

