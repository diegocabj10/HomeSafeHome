using System;
using System.ComponentModel;
using System.Reflection;
using System.Collections.Generic;
using System.Linq;

/// <summary>
/// Descripción breve de Extensiones
/// </summary>
public static class Extensiones
{
    public static bool IsIn<T>(this T @this, params T[] possibles)
    {
        return possibles.Contains(@this);
    }
}
