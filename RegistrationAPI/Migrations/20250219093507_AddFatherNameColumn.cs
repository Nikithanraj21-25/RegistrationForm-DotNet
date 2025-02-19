using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistrationAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddFatherNameColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FatherName",
                table: "Registrations",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FatherName",
                table: "Registrations");
        }
    }
}
