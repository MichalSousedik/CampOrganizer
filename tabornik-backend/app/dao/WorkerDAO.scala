package dao

import javax.inject.Inject
import models.{Worker}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

class WorkerDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext) extends HasDatabaseConfigProvider[JdbcProfile] {
  import profile.api._

  val workers = TableQuery[WorkersTable]

  def list(): Future[Seq[Worker]] = db.run {
    workers.result
  }


  class WorkersTable(tag: Tag) extends Table[Worker](tag, "WORKER") {
    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def age = column[Int]("AGE")
    def nickname = column[String]("NICKNAME")

    def * = (id, name, age, nickname) <> ((Worker.apply _).tupled, Worker.unapply)

  }

}

