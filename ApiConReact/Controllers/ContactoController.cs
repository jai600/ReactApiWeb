using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ApiConReact.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiConReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {

        private readonly ApireactContext _context;

        public ContactoController(ApireactContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("lista")]

        public async Task<IActionResult> Lista()
        {
            List<Contacto> Lista = await _context.Contactos.OrderByDescending(c => c.Idcontacto).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, Lista);
        }


        [HttpPost]
        [Route("Guardar")]

        public async Task<IActionResult> Guardar([FromBody] Contacto contactos)
        {
            await _context.Contactos.AddAsync(contactos);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");


        }

        [HttpPut]
        [Route("Editar")]

        public async Task<IActionResult> Editar([FromBody] Contacto contactos)
        {

            try
            {
                _context.Contactos.Update(contactos);
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "Editado");
            }
            catch
            {
                return StatusCode(StatusCodes.Status400BadRequest, "error");
            }

     
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]

        public async Task<IActionResult> Eliminar(int id)
        {
            Contacto contactos = _context.Contactos.Find(id);

             _context.Contactos.Remove(contactos);

            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");

        }


    }
}
