using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Mig_7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_AspNetUsers_UserId",
                table: "Notes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notes",
                table: "Notes");

            migrationBuilder.RenameTable(
                name: "Notes",
                newName: "DayNotes");

            migrationBuilder.RenameIndex(
                name: "IX_Notes_UserId",
                table: "DayNotes",
                newName: "IX_DayNotes_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DayNotes",
                table: "DayNotes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DayNotes_AspNetUsers_UserId",
                table: "DayNotes",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DayNotes_AspNetUsers_UserId",
                table: "DayNotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DayNotes",
                table: "DayNotes");

            migrationBuilder.RenameTable(
                name: "DayNotes",
                newName: "Notes");

            migrationBuilder.RenameIndex(
                name: "IX_DayNotes_UserId",
                table: "Notes",
                newName: "IX_Notes_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notes",
                table: "Notes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_AspNetUsers_UserId",
                table: "Notes",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
