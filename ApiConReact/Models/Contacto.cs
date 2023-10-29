using System;
using System.Collections.Generic;

namespace ApiConReact.Models;

public partial class Contacto
{
    public int Idcontacto { get; set; }

    public string? Nombre { get; set; }

    public string? Correo { get; set; }

    public string? Telefono { get; set; }
}
